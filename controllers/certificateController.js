const Certificate = require("../models/Certificate");
const Progress = require("../models/Progress");
const Lecture = require("../models/Lecture");
const Course = require("../models/Course");



exports.generateCertificate = async (req, res) => {

    try {

        const { courseId } = req.body;


        const progress = await Progress.findOne({
            user: req.user._id,
            course: courseId
        });


        if (!progress) {

            return res.status(404).json({
                message: "Course Progress Not Found"
            });

        }


        const totalLectures = await Lecture.countDocuments({
            course: courseId
        });


        const completedLectures =
            progress.completedLectures.length;


        const percentage = Math.round(
            (completedLectures / totalLectures) * 100
        );


        if (percentage < 100) {

            return res.status(400).json({
                message: "Complete Course First"
            });

        }


        const existingCertificate = await Certificate.findOne({

            user: req.user._id,

            course: courseId

        });



        if (existingCertificate) {

            return res.status(400).json({
                message: "Certificate Already Generated"
            });

        }



        const course = await Course.findById(courseId);


        if (!course) {

            return res.status(404).json({
                message: "Course Not Found"
            });

        }



        const certificate = await Certificate.create({

            user: req.user._id,

            course: courseId,

            certificateId:
            "CERT-" + Date.now()

        });



        res.status(201).json({

            message: "Certificate Generated Successfully",

            certificate: {

                student: req.user.name,

                course: course.title,

                certificateId: certificate.certificateId,

                issuedAt: certificate.issuedAt

            }

        });



    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};





exports.getMyCertificates = async(req,res)=>{

    try{


        const certificates = await Certificate.find({

            user:req.user._id

        })
        .populate("course","title");



        const formattedCertificates = certificates.map((item)=>{


            return {

                course: item.course.title,

                certificateId: item.certificateId,

                issuedAt: item.issuedAt

            };


        });



        res.status(200).json({

            success:true,

            certificates: formattedCertificates

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};


