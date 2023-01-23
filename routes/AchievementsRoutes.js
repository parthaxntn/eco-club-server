const express = require ('express')
const {
    createAchievement,
    getAchievement,
    getAchievements,
    deleteAchievements,
    updateAchievements

} = require('../controllers/AchievementControllers')
const router = express.Router()

//get all Achievements
router.route("/Achievements").get(getAchievements);

//get an Achievement
router.route("/Achievement/:id").get(getAchievement);

//router.post('/id' , createAchievement)
router.route("/Achievement/new").post(createAchievement);

//delete
router.route("/Achievement/delete/:id").delete(deleteAchievements);

//update
router.route("/Achievement/update/:id").put(updateAchievements);


module.exports = router

