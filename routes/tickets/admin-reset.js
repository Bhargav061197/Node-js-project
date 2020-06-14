const express = require('express')
const router = express.Router();
const winston = require('winston');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const ticketModel = require('../../models/ticket-details');

router.put('/',[auth,admin],async function(req,res){     //routes are initially passed auth and admin to verify then transferred here
    await ticketModel.updateMany({"available":false}, {"$set":{"available":true,"userDetails":[]}}, async function(err){
        if(err) winston.error(err.message, err); 
        else{
            res.json({msg:"Data Reset"});
        }
    });
});
module.exports=router;