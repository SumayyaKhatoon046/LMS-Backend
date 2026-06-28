const express = require("express");
const router = express.Router();

const {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    submitQuiz,
    getMyResults,
    getAllQuizResults
} = require("../controllers/quizController");


const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");


// Create Quiz (Teacher/Admin)
router.post(
    "/",
    protect,
    roleCheck("teacher", "admin"),
    createQuiz
);


// Get All Quizzes
router.get(
    "/",
    getAllQuizzes
);


// Submit Quiz (Student)
router.post(
    "/submit",
    protect,
    submitQuiz
);

//// Teacher/Admin - Get All Student Results by teacher
router.get(
    "/all-results",
    protect,
    roleCheck("teacher", "admin"),
    getAllQuizResults
);


// Get My Results (Student)
router.get(
    "/results",
    protect,
    getMyResults
);


// Get Single Quiz
router.get(
    "/:id",
    getQuizById
);


// Update Quiz (Teacher/Admin)
router.put(
    "/:id",
    protect,
    roleCheck("teacher", "admin"),
    updateQuiz
);


// Delete Quiz (Teacher/Admin)
router.delete(
    "/:id",
    protect,
    roleCheck("teacher", "admin"),
    deleteQuiz
);




module.exports = router;