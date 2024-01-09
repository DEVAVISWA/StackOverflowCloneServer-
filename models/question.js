const { default: mongoose } = require("mongoose");

const questionSchema = new mongoose.Schema({
    title: String,
    details: String,
    tags: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: {
        type: Number,
        default: 0
    },
    answer: [{
        answerBody: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        answeredOn: {
            type: Date,
            default: Date.now
        }
    }]
})

const Question = mongoose.model('Question', questionSchema, 'questions')

module.exports = Question