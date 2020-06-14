//A logger using winston package which allows us to log any error , catch any exception and log it 


const { createLogger, format, transports,add } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
require('express-async-errors');

module.exports = function() {
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  
  
  const logger = createLogger({
    format: combine(
      label({ label: 'error!' }),
      timestamp(),
      prettyPrint()
    ),
    transports: [   
     new transports.File({ filename: '././logs/error.log' })
    ]
    });
   
    

    add(logger);
}