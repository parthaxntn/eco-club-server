const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter blog Name"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please Enter category"],
    },
    desc: {
        type: String,
        required: [true, "Please Enter blog Description"],
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

    formLink:{
        type: String
    },
   
    startTime:{
        type:String,
        required: [false, "Please Enter blog start Time"],
        default:Date.now()
    }
})

module.exports=mongoose.model("blog",blogSchema);