const express = require("express");
const router = express.Router();

const {
    markLectureComplete,
    getCourseProgress
} = require("../controllers/progressController");

const protect = require("../middleware/authMiddleware");

router.post(
    "/complete",
    protect,
    markLectureComplete
);

router.get(
    "/:courseId",
    protect,
    getCourseProgress
);

 
module.exports = router;