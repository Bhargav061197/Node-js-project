const express = require('express')
const {User}=require('../models/user');
const ticketModel = require('../models/ticket-details');
const request = require('supertest');


describe('/routes/user/register users test',()=>{
    beforeEach(async ()=>{server = require('../api');
    await request(server)
    .post('/register')
    .send({
        "name":"yebodys",
        "email":"existing@hyperverge.com",
        "password":"123456"
    });
});
    afterEach(async ()=>{await server.close();
        await ticketModel.deleteMany({});
        await User.deleteMany({});
        
    });
    it('should register the user and return a jwt token',async ()=>{
        
        const resCorrect = await request(server)
                          .post('/register')
                          .send({"name":"ramesh","email":"new@hyperverge.com","password":"123456"});
        
        expect(resCorrect.status).toBe(200);
        expect(resCorrect.body.msg).toBe("registration success");

        const resWrong = await request(server)
                          .post('/register')
                          .send({"name":"mohan","email":"existing@hyperverge.com","password":"123456"});
        
        expect(resWrong.status).toBe(400);
        expect(resWrong.text).toBe("User already registered");
    
    });
});