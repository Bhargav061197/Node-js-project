const express = require('express')
const winston = require('winston');
const auth = require('../../middleware/auth');
const router = express.Router();
const ticketModel = require('../../models/ticket-details');
let ticketsInEventLoop = new Map();  //Map stores all current tickets which are in process of booking to avoid concurrency issues 

function checkDb(email,userData,callback){
    let reqTicketValues=[]; //This stores only int values of ticketNo/seatNo requested by user
    userData.map(function(eachUserData){
        reqTicketValues.push(eachUserData.ticketNo);
    })
    
    ticketModel.find()  //Find all ticket numbers which match all ticket numbers in tempTicket array
    .where("ticketNo")
    .in(reqTicketValues)
    .exec(function(err,data){
        
        let checkTicketAvailibility=true;       
        data.map(function(dbReturnObject){  
            checkTicketAvailibility=dbReturnObject.available & checkTicketAvailibility;   // perform and bitwise operation to check if any of ticket's availibility is false 
        });

        if(!checkTicketAvailibility){
            reqTicketValues.map(function(eachReqTicketValue){   // If one of tickets has been booked then remove all tickets sent by user from map and return response throiugh callback function
                ticketsInEventLoop.delete(eachReqTicketValue);
            });
            callback("One or multiple tickets you tried to book have already been booked please refresh page"); 
            return;
        }
        else{
            return saveDB(0,userData,email,callback); //If all tickets are available to book then proceed to saving them to database
        }
    });
}


function saveDB(indexOfuserData,userData,email,callback){
    ticketModel.updateOne({"ticketNo":userData[indexOfuserData].ticketNo}, {"$set":{"available":false,"userDetails":[{"email":email,"name":userData[indexOfuserData].name,"age":userData[indexOfuserData].age,"source":userData[indexOfuserData].source,"destination":userData[indexOfuserData].destination}]}}, function(err){
        if(err) winston.error(err.message, err); 
            else{
                
                if(indexOfuserData==userData.length-1)  {                       //If we have reached last ticket user requested to book , we return this reponse
                    ticketsInEventLoop.delete(userData[indexOfuserData].ticketNo);     //Remove booked ticket from current ticketCache
                    callback("Ticket booked successfully"); 
                    return; 
                }

                        // if(i==5) {                     //Simulate new db request in between previous db request
                        //     setTimeout(()=>{
                        //      saveDB(i+1,userData,callback);
                        //     },8000);
                        // }
                        
                else {
                    ticketsInEventLoop.delete(userData[indexOfuserData].ticketNo);
                    saveDB(indexOfuserData+1,userData,email,callback);  
                }       // continue recursively booking subsequent tickets
            }
        });
    }






router.post('/',auth ,function(req,res) {
    
    for(var i=0; i<req.body.Data.length; i++)         //check if any incoming ticket request is currently in ticketCache ,if yes:indicates it is currently in eventloop performing a db operation
    {
        if(ticketsInEventLoop.has(req.body.Data[i].ticketNo)){
            res.json({msg:"Error : Ticket queued for booking by someone else , please try again later"});
            return ;
        }
    }
    
    for(var i=0; i<req.body.Data.length; i++){          //store incoming tickets in map
        ticketsInEventLoop.set(req.body.Data[i].ticketNo,true);
    }
     
    checkDb(req.user.email,req.body.Data,function(message){         //req.user.email is sent by decoding jwt token (auth.js)
                                                    //checkDb checks if ticketNo. has alreadby been booked because of concurrency by someone or not
        res.json({msg:message});               //passsing request body and a callback function which recieves final response message
    });                    
   
});


module.exports=router;