const express = require('express')
const router = express.Router();
const winston = require('winston');
const auth = require('../../middleware/auth');
const ticketModel = require('../../models/ticket-details');


router.get('/',auth,async function(req,res){
    
        const no = req.body.ticketNo;
        if(no>40 || no<1){
            res.json({msg:"Invalid Input!"});
            return;
        }
        await ticketModel.find({"ticketNo":no}).select("available")
        .exec(async function(err,data){
        
            if(err) winston.error(err.message, err); 

            if(!data[0].available){
                res.json({Data:"close"});
            }

            if(data[0].available){
                res.json({Data:"open"});
            }
        });
});
module.exports=router;
