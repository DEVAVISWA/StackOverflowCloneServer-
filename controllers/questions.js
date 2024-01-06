const questionRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const User = require('../models/user')
const Question = require('../models/question')

const getTokenFrom = req => {
    const authorization = req.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

questionRouter.post('/', async (req, res) => {
    const { title, details } = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token is invalid or missing' })
    }
    const user = await User.findById(decodedToken.id)

    const question = new Question({
        title: title,
        details: details,
        user: user._id
    })
    const savedQuestion = await question.save()
    user.questions = user.questions.concat(savedQuestion.id)
    await user.save()
    res.json({ message: 'question posted succeessfully', question: savedQuestion })
})

questionRouter.get('/', async (req, res) => {
    try {
        const user = await Question.find()
        res.json(user)
    } catch (e) {
        console.log(e)
    }
})

module.exports = questionRouter