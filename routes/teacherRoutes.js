const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

const {
    getTeacherDashboard
} = require("../controllers/teacherController");


// Teacher Dashboard
router.get(
    "/dashboard",
    protect,
    roleCheck("teacher", "admin"),
    getTeacherDashboard
);


module.exports = router;