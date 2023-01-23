const express = require ('express')
const {
    createMember,
    getMember,
    getMembers,
    deleteMember,
    updateMember

} = require('../controllers/MemberControllers')
const router = express.Router()

//get all Members
router.route("/Members").get(getMembers);

//get an Member
router.route("/Member/:id").get(getMember);

//router.post('/id' , createMember)
router.route("/Member/new").post(createMember);

//delete
router.route("/Member/delete/:id").delete(deleteMember);

//update
router.route("/Member/update/:id").put(updateMember);


module.exports = router

