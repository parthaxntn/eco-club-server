const mongoose = require('mongoose')

const Schema = mongoose.Schema
const achievementsSchema = new Schema({

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
    title :{
        type : String,
        required : true
    },
    descp : {
        type : String ,
        required : true
    },

},{timestamps : true })

module.exports = mongoose.model('achievements' , achievementsSchema)


