const mongoose = require('mongoose')

const Schema = mongoose.Schema
const membersSchema = new Schema({

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
    name :{
        type : String,
        required : true
    },
    designation : {
        type : String ,
        required : true
    },

    date: {
         type: Date,
         default: +new Date() ,
         required : false
    },

},{timestamps : true })

module.exports = mongoose.model('members' , membersSchema)


