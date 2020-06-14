const express = require('express')
const router = express.Router();
const winston = require('winston');
const auth = require('../../middleware/auth');
const ticketModel = require('../../models/ticket-details');

router.get('/',auth,async function(req,res){
    
    await ticketModel.find({"available":true}).select("ticketNo -_id")
    .exec(function(err,data){
        if(err) winston.error(err.message, err); 
        else res.json({Data:data});
    }); 
});
module.exports=router;