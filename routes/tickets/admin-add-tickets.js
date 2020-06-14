const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const ticketModel = require('../../models/ticket-details');
const ticketData=require('../../data/ticketsPreFill')

router.post('/',[auth,admin],async function(req,res,next){
    ticketModel.collection.insertMany(ticketData.ticketData,function(err,data){
        if(err)
        res.json({msg:"Tickets already exist"});
        else
        res.json({msg:"saved"});
    })
    
    
 
});
module.exports=router