const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sumayya
 *               email:
 *                 type: string
 *                 example: sumayya@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: student
 *     responses:
 *       201:
 *         description: User Registered Successfully
 *       400:
 *         description: User Already Exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: sumayya@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login Successful
 *       401:
 *         description: Invalid Credentials
 */

router.get("/test", (req, res) => {
    res.send("Auth Route Working");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;