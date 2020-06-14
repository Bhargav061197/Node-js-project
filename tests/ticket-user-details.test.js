const ticketModel = require('../models/ticket-details');
const request = require('supertest');
const {User}=require('../models/user');
var token; 

describe('/routes/ticketuserdetais',()=>{
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
    it('should return response for a ticket user details',async ()=>{
        await ticketModel.collection.insertMany([
            {ticketNo:1,available:false,userDetails:[{email:"ram123@google.com",name:"Ram",age:"43",source:"ahm",destination:"bom"}]},
            {ticketNo:2,available:true}
        ]);
        const resUserAvailable = await request(server)
        .get('/ticketuserdetails')
        .send({"ticketNo":1})
        .set({'x-auth-token' : token.body.key});
        
        expect(resUserAvailable.status).toBe(200);
        expect(resUserAvailable.body.Details).toStrictEqual({name:"Ram",age:43,source:"ahm",destination:"bom"});
        
        const resUserNotAvailable = await request(server)
        .get('/ticketuserdetails')
        .send({"ticketNo":2})
        .set({'x-auth-token' : token.body.key});


        expect(resUserNotAvailable.status).toBe(200);
        expect(resUserNotAvailable.body.msg).toBe("No User Available");
        
    
    });
});