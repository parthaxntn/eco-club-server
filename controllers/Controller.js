const blog = require("../models/Blog/blogModel"); //schema
const cloudinary = require("cloudinary");


//create blog
exports.createblog = async (req, res, next) => {
    try {
        console.log(req.body);
        if (req.files){

            let images = [];
            images = req.files
            
            const imagesLink = [];
            
            // for (let i = 0; i < images.length; i++) {
            //     const result = await cloudinary.v2.uploader.upload(images, {
            //         folder: "blog",
            //     });
                
            //     console.log(result.public_id);
                
            //     imagesLink.push({
            //         public_id: result.public_id,
            //         url: result.secure_url,
            //     })
            // // }
            // console.log(imagesLink);
            // req.body.images = imagesLink;
        }
        const data = {...req.body,"category": req.params.cate}
        const blogdata = await blog.create(data);
        // console.log(data);
        res.status(201).json({
            success: true,
            // data : {
            //     ...blogdata,
            //     "category": req.params.cate
            // },
            blogdata
        })

    } catch (err) {
        res.send(err.message);
    }

}

//update blog
exports.updateblog = async (req, res, next) => {
    try {
        let blog_item = await blog.findById(req.params.id);
        if (!blog_item) {
            return res.status(500).json({
                success: false,
                message: "blog not found"
            })
        }

        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images)
        }
        else images = req.body.images

        //checking if any image is uploded or not
        if (images !== undefined) {
            //removing old images
            for (let i = 0; i < blog_item.images.length; i++) {
                await cloudinary.v2.uploader.destroy(blog_item.images[i].public_id);
            }

            //updating image links
            const imagesLink = [];
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "blog",
                });

                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                })
            }
            req.body.images = imagesLink;
        }
        blog_item_updated = await blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            blog_item_updated
        })
    } catch (err) {
        res.send(err.message);
    }
}

//Delete blog
exports.deleteblog = async (req, res, next) => {
    try {
        const blog_item = await blog.findById(req.params.id);
        if (!blog_item) {
            return res.status(500).json({
                success: false,
                message: "blog not found"
            })
        }

        //removing images from cloudinary
        for (let i = 0; i < blog_item.images.length; i++) {
            await cloudinary.v2.uploader.destroy(blog_item.images[i].public_id);
        }

        await blog_item.remove();

        res.status(200).json({
            success: true,
            message: "blog deleted"
        })
    } catch (err) {
        res.send(err.message);
    }
}


//Get one blog Detail
exports.getblogDetails = async (req, res, next) => {
    try {
        const blog = await blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found"
            })
        }

        res.status(200).json({
            success: true,
            blog,
        })
    } catch (err) {
        res.send(err.message);
    }
}


//get all blog
exports.getAllblog = async (req, res) => {
    try {
        const blogdata = await blog.find({category: req.params.cate});
        // const blogCount = await blogdata.countDocuments();

        res.status(201).json(
            blogdata
        )
    } catch (err) {
        res.send(err.message);
    }
}