const express = require('express')
const {User}=require('../models/user');
const ticketModel = require('../models/ticket-details');
const request = require('supertest');


describe('/routes/user/auth-users test',()=>{
    beforeEach(async ()=>{server = require('../api');
    await request(server)
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
    it('should login the user and return a jwt token',async ()=>{
        
        const resCorrect = await request(server)
                          .post('/login')
                          .send({"email":"abcd@hyperverge.com","password":"123456"});
        
        expect(resCorrect.status).toBe(200);
        expect(resCorrect.body.msg).toBe("successfull login");

        const resWrong = await request(server)
                          .post('/login')
                          .send({"email":"wrong@hyperverge.com","password":"123456"});
        
        expect(resWrong.status).toBe(400);
        expect(resWrong.text).toBe("Invalid email or password.");
    
    });
});