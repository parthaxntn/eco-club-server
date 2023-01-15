const express = require ('express')
const {
    createEvent,
    getEvent,
    getEvents,
    deleteEvents,
    updateEvents

} = require('../controllers/EventControllers')
const router = express.Router()



//get all events
//router.get('/ ', getEvents)
router.route("/events").get(getEvents);

//post
//router.post('/id' , createEvent)
router.route("/new").post(createEvent);


//delete
router.route("/delete/:id").delete(deleteEvents);

//update
router.route("/update/:id").put(updateEvents);



module.exports = router

