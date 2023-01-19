const express = require ('express')
const {
    createMember,
    getMember,
    getMembers,
    deleteMembers,
    updateMembers

} = require('../controllers/MemberControllers')
const router = express.Router()

//get all Members
router.route("/Members").get(getMembers);

//get an Member
router.route("/Member/:id").get(getMember);

//router.post('/id' , createMember)
router.route("/Member/new").post(createMember);

//delete
router.route("/Member/delete/:id").delete(deleteMembers);

//update
router.route("/Member/update/:id").put(updateMembers);


module.exports = router

