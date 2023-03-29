const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please Enter category"],
    },
    desc: {
        type: String,
    },
    images: [
        {
            public_id: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            }
        }
    ],
    subtitle:{
        type: String,
    },
    designation:{
        type: String,
    },
    time:{
        type:String,
        required: [false, "Please Enter blog start Time"],
        default:Date.now()
    }
})

module.exports=mongoose.model("blog",blogSchema);