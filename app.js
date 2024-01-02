const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

app.use('/signup', userRouter)
app.use('/login',loginRouter)

module.exports = {
    app
}