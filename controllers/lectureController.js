const Lecture = require("../models/Lecture");
const Course = require("../models/Course");


exports.addLecture = async (req,res)=>{

    try{

        const {title, videoUrl} = req.body;

        const course = await Course.findById(req.params.courseId);

        if(!course){
            return res.status(404).json({
                message:"Course Not Found"
            });
        }


        const lecture = await Lecture.create({
            title,
            videoUrl,
            course: req.params.courseId
        });


        res.status(201).json({

    message: "Lecture Added Successfully",

    lecture: {

        _id: lecture._id,

        title: lecture.title,

        videoUrl: lecture.videoUrl,

        course: lecture.course

    }

});


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


exports.getLectures = async (req, res) => {

    try {

        const lectures = await Lecture.find({
            course: req.params.courseId
        });

        res.status(200).json({
            success: true,
            lectures
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }
};



exports.deleteLecture = async (req, res) => {

    try {

        const lecture = await Lecture.findByIdAndDelete(
            req.params.id
        );

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture Not Found"
            });
        }

        res.status(200).json({
            message: "Lecture Deleted Successfully"
        });


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};


exports.updateLecture = async (req, res) => {
    try {

        const lecture = await Lecture.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture Not Found"
            });
        }

        res.status(200).json({
            message: "Lecture Updated Successfully",
            lecture
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};