const { default: mongoose } = require('mongoose')
const Question = require('../models/question')

const answerRouter = require('express').Router()

answerRouter.patch('/',async(req,res)=>{
    const {questionId:_id} =req.params
    const{answerBody,userAnswered} = req.body
    const userId= req.userId
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error:'question unavailable..'})
    }
    try{
        const answerQuestion= await Question.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
        res.status(200).json(answerQuestion)
    } catch(error){
        res.status(400).json({message:'error answering question'})
    }
})

module.exports = answerRouter