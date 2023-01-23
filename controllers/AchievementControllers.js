const Achievement = require ('../models/AchievementModels')
const mongoose = require('mongoose')



//get all achievements
const getAchievements = async (req,res)=>{
    const achievement = await Achievement.find({}).sort({createdAt : -1})
    res.status(200).json(achievement )
}


//get a single achievement
const getAchievement = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such achievement'})
    }
    const achievement = await Achievement.findById(id)

    if (!achievement){
        return res.status(404).json({error : 'No such achievement'})
    }
    res.status(200).json(achievement)
}


//create new achievement
const createAchievement = async (req,res)=>{
    const{title, descp } = req.body
    try{
        const achievement = await Achievement.create({title, descp })
        res.status(200).json(achievement)

    } catch(error){
        res.status(200).json({error: error.message})

    }
}

const deleteAchievement = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such achievement'})
    }

    const achievement = await Achievement.findOneAndDelete({_id: id})
    if (!achievement){
        return res.status(400).json({error:'No such achievement'})
    }

    res.status(200).json(achievement)
    
}


//update achievement
const updateAchievement = async (req,res)=>{
    const  {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such achievement'})
    }

    const achievement = await Achievement.findOneAndUpdate({_id : id} , {
        ...req.body
    })

    if (!achievement){
        return res.status(400).json({error:'No such achievement'})
    }
    res.status(200).json(achievement)
}



module.exports = {
    createAchievement,
    getAchievement,
    getAchievements,
    deleteAchievement,
    updateAchievement
}

