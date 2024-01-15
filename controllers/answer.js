const { default: mongoose } = require('mongoose')
const Question = require('../models/question')

const answerRouter = require('express').Router()

answerRouter.get('/:questionId', async (req, res) => {
    const questionId= req.params.questionId
    try {
        const questions = await Question.findById(questionId).populate('user')
        res.json(questions)
    } catch (e) {
        console.log(e)
    }
})

answerRouter.patch('/:questionId', async (req, res) => {
    const { questionId: _id } = req.params
    const { answerBody, userId, questionId } = req.body

    if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
        return res.status(404).json({ error: 'question unavailable..' })
    }
    try {
        const answerQuestion = await Question.findByIdAndUpdate(questionId, { $addToSet: { 'answer': [{ answerBody, userId, questionId }] } }, { new: true })
        res.status(200).json(answerQuestion)
    } catch (error) {
        res.status(400).json({ message: 'error answering question' })
    }
})

module.exports = answerRouter