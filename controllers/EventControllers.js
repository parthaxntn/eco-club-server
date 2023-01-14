const Event = require ('../models/EventModels')
const mongoose = require('mongoose')


//get all events
const getEvents = async (req,res)=>{
    const event = await Event.find({}).sort({createdAt : -1})
    res.status(200).json(event )
}

//get a single event
const getEvent = async (req,res)=>{
    const  {id} = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such event'})
    }


    const event = await Event.findById(id)

    if (!event){
        return res.status(404).json({error : 'No such event'})
    }
    

    res.status(200).json(event)
}

//create new event
const createEvent = async (req,res)=>{
    const{title, host,date,time,descp} = req.body
    try{
        const event = await Event.create({title, host,date,time,descp})
        res.status(200).json(event)

    } catch(error){
        res.status(200).json({error: error.message})

    }
}

const deleteEvents = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such event'})
    }

    const event = await Event.findOneAndDelete({_id: id})
    if (!event){
        return res.status(400).json({error:'No such event'})
    }

    res.status(200).json(event)
    
}


//update event
const updateEvents = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such event'})
    }

    const event = await Event.findOneAndUpdate({_id : id} , {
        ...req.body
    })

    if (!event){
        return res.status(400).json({error:'No such event'})
    }
    res.status(200).json(event)
}




// exports.deleteEvent = async (req, res, next) => {
//     try {
//         const event = await Event.findById(req.params.id);
//         if (!event) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Event not found"
//             })
//         }

//         //removing images from cloudinary
//         for (let i = 0; i < event.images.length; i++) {
//             await cloudinary.v2.uploader.destroy(event.images[i].public_id);
//         }

//         await event.remove();

//         res.status(200).json({
//             success: true,
//             message: "Event deleted"
//         })
//     } catch (err) {
//         res.send(err.message);
//     }
// }



module.exports = {
    createEvent,
    getEvent,
    getEvents,
    deleteEvents
}