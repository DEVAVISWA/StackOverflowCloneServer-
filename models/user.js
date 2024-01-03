const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    passwordHash: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    questions : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
})

const User= mongoose.model('User', userSchema, 'users')

module.exports= User