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
    }
})

const Question = mongoose.model('Question', questionSchema, 'questions')

module.exports = Question