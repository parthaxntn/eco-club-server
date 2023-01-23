const mongoose = require('mongoose')

const Schema = mongoose.Schema
const eventsSchema = new Schema({

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
    host : {
        type : String ,
        required : true
    },
    date : {
        type : Date ,
        required : false,
        default: new Date()

    },
    time : {
        type : Date ,
        required : false

    },
    descp : {
        type : String ,
        required : true

    },
   

},{timestamps : true })

module.exports = mongoose.model('events' , eventsSchema)