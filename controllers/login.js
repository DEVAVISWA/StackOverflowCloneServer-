const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: 'user does not exist' })
    }

    const isAuthenticated = await bcrypt.compare(password, user.passwordHash)
    if (!isAuthenticated) {
        return res.status(400).json({ message: 'the entered password is wrong' })
    }

    const jwtPayload = {
        displayName: user.displayName,
        id: user._id
    }
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '5h' })
    res.status(200).json({
        token,
        displayName: user.displayName,
        email: user.email
    })
}) 

module.exports= loginRouter 