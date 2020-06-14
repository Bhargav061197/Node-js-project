const mongoose = require('mongoose');
const {ticketUserDetails}=require('./ticketUserDetails');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    available: {
        type:Boolean
    },
    ticketNo:{
        type:Number,
        unique:true,
        sparse:true,
        min:1,
        max:40
    },
    userDetails:[ticketUserDetails]


})
const ticketModel=mongoose.model('tickets',ticketSchema);
module.exports=ticketModel;
