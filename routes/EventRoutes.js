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
router.route("/events").get(getEvents);

//get an event
router.route("/event/:id").get(getEvent);

//router.post('/id' , createEvent)
router.route("/event/new").post(createEvent);

//delete
router.route("/event/delete/:id").delete(deleteEvents);

//update
router.route("/event/update/:id").put(updateEvents);


module.exports = router

