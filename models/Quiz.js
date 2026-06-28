const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    questions: [
        {
            question: String,

            options: [String],

            correctAnswer: String
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Quiz",
    quizSchema
);