const express = require('express')
const cors = require('cors')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const questionRouter = require('./controllers/questions')
const answerRouter = require('./controllers/answer')
const middleware= require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/signup', userRouter)
app.use('/login',loginRouter)
app.use('/ask', questionRouter)
app.use('/answer',answerRouter)

module.exports = {
    app
}