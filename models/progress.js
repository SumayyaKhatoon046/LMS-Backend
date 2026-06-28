const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },

    completedLectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ]

});

module.exports = mongoose.model(
    "Progress",
    progressSchema
);