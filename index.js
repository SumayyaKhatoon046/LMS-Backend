require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes=require("./routes/authRoutes");
const courseRoutes=require("./routes/courseRoutes");
const app = express();
const userRoutes = require("./routes/userRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const progressRoutes = require("./routes/progressRoutes");
const quizRoutes = require("./routes/quizRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const teacherRoutes = require("./routes/teacherRoutes");



app.use("/api/users", userRoutes);
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/teacher", teacherRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/lms")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("LMS Backend Running");
});

app.listen(5000, () => {
    console.log("Server Started on Port 5000");
});