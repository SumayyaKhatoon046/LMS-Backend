const express = require("express");
const router = express.Router();

const {
    addLecture,
    getLectures,
    deleteLecture,
    updateLecture

} = require("../controllers/lectureController");


const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");


// Add Lecture
router.post(
    "/:courseId",
    protect,
    roleCheck("teacher", "admin"),
    addLecture
);


// Get Lectures of Course
router.get("/:courseId", getLectures);


// Delete Lecture
router.delete(
    "/:id",
    protect,
    roleCheck("teacher", "admin"),
    deleteLecture
);

//update lecture
router.put(
    "/:id",
    protect,
    roleCheck("teacher", "admin"),
    updateLecture
);


module.exports = router;