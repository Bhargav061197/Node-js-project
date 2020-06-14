const express=require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app=express();
const config=require('config');

require('./startup/logging')();
require('./startup/db')();
require('./startup/config')();
require('./startup/routes')(app);


const port=process.env.PORT || 8899;
const server = app.listen(port,function(){
  console.log("Port is "+ port);
});

module.exports=server;