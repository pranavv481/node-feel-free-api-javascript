const winston = require('winston');
require('winston-mongodb');
const logger = winston.createLogger({
    transports: [
    //   new winston.transports.Console(),
      new winston.transports.File({ filename: 'logfile.log' }),
      new winston.transports.MongoDB({db:process.env.DB_URL})
    ]
  });
  
  module.exports = {logger};