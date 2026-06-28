const Progress = require("../models/Progress");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");

exports.markLectureComplete = async (req, res) => {
    try {

        const { courseId, lectureId } = req.body;

        let progress = await Progress.findOne({
            user: req.user._id,
            course: courseId
        });

        if (!progress) {

            progress = await Progress.create({
                user: req.user._id,
                course: courseId,
                completedLectures: []
            });

        }

        progress.completedLectures.push(lectureId);

        await progress.save();

        res.status(200).json({
            message: "Lecture Marked Complete",
            progress
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


exports.getCourseProgress = async (req, res) => {

    try {

        const progress = await Progress.findOne({
            user: req.user._id,
            course: req.params.courseId
        });

        if (!progress) {
            return res.status(404).json({
                message: "Progress Not Found"
            });
        }

        const totalLectures = await Lecture.countDocuments({
            course: req.params.courseId
        });

        const completedLectures =
            progress.completedLectures.length;

        const progressPercentage =
            totalLectures === 0
                ? 0
                : Math.round(
                    (completedLectures / totalLectures) * 100
                );

        res.status(200).json({
            success: true,
            totalLectures,
            completedLectures,
            progressPercentage,
            progress
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};