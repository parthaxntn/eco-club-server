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



module.exports = {
    createEvent,
    getEvent,
    getEvents,
    deleteEvents,
    updateEvents
}