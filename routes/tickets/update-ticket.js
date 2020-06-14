const express = require('express')
const router = express.Router();
const winston = require('winston');
const auth = require('../../middleware/auth');
const ticketModel = require('../../models/ticket-details');

router.put('/',auth,async function(req,res) {
    const status = req.body.status;
    const no = req.body.ticketNo;
    
    if(no>40 || no<1) {
        res.status(500);
        res.json({msg:"Invalid Input!"});
        return;
    }

    await ticketModel.find({"userDetails.email":req.user.email,"ticketNo":no}) // checking if ticketno. sent by him is the one which the user booked using his jwt token(when he was logged in)
        .exec(async function(err,data){

            if(err) winston.error(err.message, err); 

            else if(data.length==0 || data[0].available) res.json({msg:"No User Available"});
            
            
            else{                   //if such user is found then following
                    if(status=="close") {   // close status from user indicates ticket cancellation
                        await ticketModel.updateOne({"ticketNo":no}, {"$set":{"available":true,"userDetails":[]}},async function(err){
                            if(err) winston.error(err.message, err); 
                            else{
                                res.json({msg:"Ticket Cancelled"});
                            }   
                        });    
                    }
                    
                    else {
                        const name=req.body.name;
                        const age=req.body.age;
                        const source=req.body.source;
                        const destination=req.body.destination;
                        ticketModel.updateOne({"ticketNo":no}, {"$set":{"available":false,"userDetails":[{"email":req.user.email,"name":name,"age":age,"source":source,"destination":destination}]}},async function(err){
                            if(err){
                                winston.error(err.message, err);
                            }
                            else{
                                res.json({Data:"Data Updated"});
                            }
                        });
                    }
            }
        });
});
module.exports=router;