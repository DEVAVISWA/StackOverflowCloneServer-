const { default: mongoose } = require('mongoose')
const Question = require('../models/question')
// const { findById } = require('../models/user')

const answerRouter = require('express').Router()

answerRouter.patch('/:questionId',async(req,res)=>{
    const {questionId:_id} =req.params
    // console.log(req.params)

    // const{answerBody,userAnswered} = req.body
    // const userId= req.userId

    const {answerBody,userId,questionId} = req.body

    if(!mongoose.Types.ObjectId.isValid(req.params.questionId)){
        return res.status(404).json({error:'question unavailable..'})
    }
    try{
        // console.log(req.params.questionId)
        // const ID= await Question.findById(req.params.questionId)
        // console.log(ID)
        // const answerQuestion= await Question.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
        const answerQuestion= await Question.findByIdAndUpdate(questionId,{$addToSet:{'answer':[{answerBody,userId,questionId}]}},{new:true})
        // console.log(answerQuestion)
        res.status(200).json(answerQuestion)
    } catch(error){
        res.status(400).json({message:'error answering question'})
    }
})

module.exports = answerRouter