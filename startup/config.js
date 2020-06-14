// loading jwt token before any process and if its not loaded process stops 

const config = require('config');   //loads from config folder

module.exports = function() {
  if(!config.get('jwtPrivateKey')){
    console.error("Not loaded JWT");
    process.exit(1);
  }
}