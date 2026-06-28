const User = require("../models/User");
const Progress = require("../models/Progress");
const QuizResult = require("../models/QuizResult");
const Lecture = require("../models/Lecture");


exports.getStudentDashboard = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);


        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }


        const progress = await Progress.find({
            user: req.user._id
        })
        .populate("course", "title");


        const quizResults = await QuizResult.find({
            user: req.user._id
        })
        .populate("quiz", "title");



        const formattedProgress = await Promise.all(
            progress.map(async (item) => {


                const totalLectures = await Lecture.countDocuments({
                    course: item.course._id
                });


                const completedLectures = item.completedLectures.length;


                const progressPercentage = totalLectures === 0 
                    ? 0 
                    : Math.round(
                        (completedLectures / totalLectures) * 100
                    );


                return {

                    course: item.course.title,

                    totalLectures,

                    completedLectures,

                    progressPercentage

                };

            })
        );



        const formattedQuizResults = quizResults.map((item) => {

            return {

                quiz: item.quiz.title,

                score: item.score,

                totalQuestions: item.totalQuestions,

                percentage: Math.round(
                    (item.score / item.totalQuestions) * 100
                )

            };

        });



        res.status(200).json({

            success: true,

            dashboard: {

                name: user.name,

                email: user.email,

                courses: formattedProgress,

                quizResults: formattedQuizResults

            }

        });



    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};