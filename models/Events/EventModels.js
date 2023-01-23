const mongoose = require('mongoose')

const Schema = mongoose.Schema
const eventsSchema = new Schema({

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
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
        required : true

    },
    time : {
        type : Date ,
        required : true

    },
    descp : {
        type : String ,
        required : true

    },
   

},{timestamps : true })

module.exports = mongoose.model('events' , eventsSchema)