const express = require ('express')
const multer = require('multer')()
const {
    createblog,
    updateblog,
    deleteblog,
    getblogDetails,
    getAllblog

} = require('../controllers/Controller');
const router = express.Router()


//get an event
router.route("/update/:id").get(getblogDetails).delete(deleteblog).put(updateblog)

//router.post('/id' , createEvent)
router.route("/:cate/new").post(createblog);

//get all events
router.route("/:cate").get(getAllblog)

module.exports = router

