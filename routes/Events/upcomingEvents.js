const express = require ('express')
const {
    createEvent,
    getEvent,
    getEvents

} = require('../../controllers/Events/EventControllers')
const router = express.Router()



//get all events
router.get('/', getEvents)

//post
router.post('/' , createEvent)

//delete
//router.delete('/' , deleteEvent)



module.exports = router

