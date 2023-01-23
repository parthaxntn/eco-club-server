const Member = require ('../models/MemberModels')
const mongoose = require('mongoose')


//get all members
const getMembers = async (req,res)=>{
    const member = await Member.find({}).sort({createdAt : -1})
    res.status(200).json(member )
}


//get a single member
const getMember = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such member'})
    }
    const member = await Member.findById(id)

    if (!member){
        return res.status(404).json({error : 'No such member'})
    }
    res.status(200).json(member)
}


//create new member
const createMember = async (req,res)=>{
    const{name, designation , date} = req.body
    try{
        const member = await Member.create({name, designation , date})
        res.status(200).json(member)

    } catch(error){
        res.status(200).json({error: error.message})

    }
}

const deleteMember = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such member'})
    }

    const member = await Member.findOneAndDelete({_id: id})
    if (!member){
        return res.status(400).json({error:'No such member'})
    }

    res.status(200).json(member)
    
}


//update member
const updateMember = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such member'})
    }

    const member = await Member.findOneAndUpdate({_id : id} , {
        ...req.body
    })

    if (!member){
        return res.status(400).json({error:'No such member'})
    }
    res.status(200).json(member)
}



module.exports = {
    createMember,
    getMember,
    getMembers,
    deleteMember,
    updateMember
}