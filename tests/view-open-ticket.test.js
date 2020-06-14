const ticketModel = require('../models/ticket-details');
const request = require('supertest');
const {User}=require('../models/user');
var token; 

describe('/routes/viewopenticket',()=>{
    beforeEach(async ()=>{server = require('../api');
    token=await request(server)
    .post('/register')
    .send({
        "name":"Ramesh",
        "email":"ram123@google.com",
        "password":"123456"
        });
    });
    afterEach(async ()=>{await server.close();
        await ticketModel.deleteMany({});
        await User.deleteMany({});
    });
    it('should return all open tickets',async ()=>{
        await ticketModel.collection.insertMany([
            {ticketNo:1,available:true},
            {ticketNo:2,available:true},
            {ticketNo:3,available:true}
        ]);
        const res = await request(server)
                            .get('/viewopentickets')
                            .set({'x-auth-token' : token.body.key});
        
        expect(res.status).toBe(200);
        expect(res.body.Data.length).toBe(3);
        expect(res.body.Data.some(ticket=>ticket.ticketNo ==1)).toBeTruthy();
        expect(res.body.Data.some(ticket=>ticket.ticketNo ==2)).toBeTruthy();
        expect(res.body.Data.some(ticket=>ticket.ticketNo ==3)).toBeTruthy();   
    
    });
});