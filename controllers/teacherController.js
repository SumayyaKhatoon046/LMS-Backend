const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Quiz = require("../models/Quiz");
const Certificate = require("../models/Certificate");
const User = require("../models/User");


exports.getTeacherDashboard = async (req, res) => {

    try {

        const teacherId = req.user._id;


        // Teacher ke courses
        const courses = await Course.find({
            instructor: teacherId
        });


        const courseIds = courses.map(
            course => course._id
        );


        // Total lectures
        const totalLectures = await Lecture.countDocuments({
            course: {
                $in: courseIds
            }
        });


        // Total quizzes
        const totalQuizzes = await Quiz.countDocuments({
            course: {
                $in: courseIds
            }
        });


        // Total students enrolled
        const students = await User.countDocuments({
            enrolledCourses: {
                $in: courseIds
            }
        });


        // Total certificates
        const totalCertificates = await Certificate.countDocuments({
            course: {
                $in: courseIds
            }
        });



        res.status(200).json({

            success: true,

            dashboard: {

                teacher: req.user.name,

                totalCourses: courses.length,

                totalLectures,

                totalStudents: students,

                totalQuizzes,

                totalCertificates

            }

        });


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};