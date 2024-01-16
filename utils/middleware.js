const { log } = require("./logger")

const requestLogger= (req,res,next) => {
    log('Method :', req.method)
    log('Path :', req.path)
    log('Body :', req.body)
    log('Headers :',req.headers)
    log('----------------------------------------------------------')
    next()
}

module.exports ={
    requestLogger
}