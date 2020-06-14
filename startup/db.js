const config = require('config');
const mongoose = require('mongoose');

module.exports= function(){
    mongoose.connect(config.get("db"), { useCreateIndex: true,useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>console.log("Current db is " +config.get("db")));
}