const express = require ('express')
const {
    createEvent,
    getEvent,
    getEvents,
    deleteEvents

} = require('../controllers/EventControllers')
const router = express.Router()



//get all events
//router.get('/ ', getEvents)
router.route("/events").get(getEvents);

//post
//router.post('/id' , createEvent)
router.route("/new").post(createEvent);


//delete
router.route("/event/:id").delete(deleteEvents);

//update
//router.delete('/' , updateEvent)



module.exports = router

