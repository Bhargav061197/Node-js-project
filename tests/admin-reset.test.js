const express = require('express')
const {User}=require('../models/user');
const ticketModel = require('../models/ticket-details');
const request = require('supertest');
var token;

describe('/routes/admin reset test',()=>{
    beforeEach(async ()=>{server = require('../api');
    token=await request(server)
    .post('/register')
    .send({
        "name":"yebodys",
        "email":"abcd@hyperverge.com",
        "password":"123456"
    });
});
    afterEach(async ()=>{await server.close();
        await ticketModel.deleteMany({});
        await User.deleteMany({});
        
    });
    it('should return response for reset tickets',async ()=>{
        await ticketModel.collection.insertMany([
            {ticketNo:1,available:true},
            {ticketNo:2,available:true},
            {ticketNo:3,available:true}
        ]);
        
        const res = await request(server)
                          .put('/adminreset')
                          .set({'x-auth-token' : token.body.key});
        
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Data Reset");
    
    });
});