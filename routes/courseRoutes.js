const express = require("express");
const router = express.Router();

const {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    enrollCourse
} = require("../controllers/courseController");

const roleCheck = require("../middleware/roleMiddleware");
const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course Management APIs
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 */
router.get("/", getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 */
router.get("/:id", getCourseById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Data Structures
 *               description:
 *                 type: string
 *                 example: Learn DSA from scratch
 *               category:
 *                 type: string
 *                 example: Programming
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post(
    "/",
    protect,
    roleCheck("admin", "teacher"),
    addCourse
);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put(
    "/:id",
    protect,
    roleCheck("admin", "teacher"),
    updateCourse
);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete(
    "/:id",
    protect,
    roleCheck("admin", "teacher"),
    deleteCourse
);

/**
 * @swagger
 * /api/courses/enroll:
 *   post:
 *     summary: Enroll in a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: 687abc1234567890abcdef12
 *     responses:
 *       200:
 *         description: Course enrolled successfully
 */
router.post(
    "/enroll",
    protect,
    enrollCourse
);

module.exports = router;