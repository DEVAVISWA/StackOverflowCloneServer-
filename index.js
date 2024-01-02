const { default: mongoose } = require("mongoose");
const { log, err } = require("./utils/logger");
const { MONGODB_URI, PORT } = require("./utils/config");
const { app } = require("./app");

mongoose.set('strictQuery', false)
log('connecting to DB', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        log('connected to DB')
        app.listen(PORT,()=>{
            log(`server running on http://127.0.0.1:${PORT}`)
        })
    })
    .catch((error) => {
        err('err connecting to DB', error)
    })