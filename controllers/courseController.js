const Course = require("../models/Course");
const User = require("../models/User");

exports.addCourse = async (req, res) => {
    try {

        const { title, description, category } = req.body;


        const course = await Course.create({

            title,

            description,

            instructor: req.user._id,

            category

        });


        res.status(201).json({

            message: "Course Added Successfully",

            course

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }
};

exports.getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find();

        res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



exports.getCourseById = async (req, res) => {
    try {

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course Not Found"
            });
        }

        res.status(200).json(course);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



exports.updateCourse = async (req, res) => {
    try {

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: "Course Not Found"
            });
        }

        res.status(200).json({
            message: "Course Updated Successfully",
            updatedCourse
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


exports.deleteCourse = async (req, res) => {
    try {

        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({
                message: "Course Not Found"
            });
        }

        res.status(200).json({
            message: "Course Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


exports.enrollCourse = async (req, res) => {
    try {

        const { courseId } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course Not Found"
            });
        }

        user.enrolledCourses.push(courseId);

        await user.save();

        res.status(200).json({
            message: "Course Enrolled Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};