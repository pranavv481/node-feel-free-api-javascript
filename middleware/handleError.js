const {logger} = require("../logger/logger");
require('winston-mongodb');

process.on("uncaughtException",(err)=>{
  console.log("uncaughtException")
  logger.error(err.message, err)
})
process.on("unhandledRejection",(err)=>{
  console.log("unhandledRejection")
  logger.error(err.message, err)
})


function handleError(err, req, res, next) {
  try{
      if(res.status==200){
        logger.error(err.message, err)
          res.status(500)
      }
      logger.error(err.message, err)
       res.json({err:err.message || "Something Went Wrong"})
  }catch(err){
       console.log(err)
  }
    
}

module.exports = handleError