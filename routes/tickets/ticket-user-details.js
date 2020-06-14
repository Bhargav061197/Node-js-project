const _ = require('lodash');
const express = require('express')
const router = express.Router();
const winston = require('winston');
const auth = require('../../middleware/auth');
const ticketModel = require('../../models/ticket-details');

router.get('/',auth,async function(req,res){
   
        const no = req.body.ticketNo;                                                    

        await ticketModel.find({"userDetails.email":req.user.email, "ticketNo":no})     // checking if ticketno. sent by him is the one which the user booked using his jwt token(when he was logged in)
                                                                                        //req.user.email is sent by decoding jwt token (auth.js)
        .exec(async function(err,data){
            if(err) winston.error(err.message, err); 
            else if(data.length==0 || data[0].available){
                
                res.json({msg:"No User Available"});
            }
            else{
                    res.json({Details:_.pick(data[0].userDetails[0],['name','age','source','destination'])});  
            }
        });
   
});
module.exports=router;