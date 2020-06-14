const ticketModel = require('../models/ticket-details');
const request = require('supertest');
const {User}=require('../models/user');
var token; 


describe('/routes/update ticket',()=>{
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
    it('should return response for a ticket close or open',async ()=>{
        await ticketModel.collection.insertMany([
            {ticketNo:4,available:false,userDetails:[{email:"ram123@google.com",name:"Ram",age:43,source:"ahm",destination:"bom"}]},
            {ticketNo:5,available:false,userDetails:[{email:"ram123@google.com",name:"mohan",age:40,source:"ahm",destination:"bom"}]}
            ]);

        const resforInvalid=await request(server)
                            .put('/updateticket')
                            .send({"ticketNo":41})
                            .set({'x-auth-token' : token.body.key});

        expect(resforInvalid.status).toBe(500);
        expect(resforInvalid.body.msg).toBe("Invalid Input!");


        const resforCancel = await request(server)
                            .put('/updateticket')
                            .send({"ticketNo":4,status:"close"})
                            .set({'x-auth-token' : token.body.key});
        
        expect(resforCancel.status).toBe(200);
        expect(resforCancel.body.msg).toBe("Ticket Cancelled");
        
        const resforUpdate = await request(server)
                            .put('/updateticket')
                            .send({"ticketNo":5 , name:"mahesh",age:40,source:"ahm",destination:"bom"})
                            .set({'x-auth-token' : token.body.key});


        expect(resforUpdate.status).toBe(200);
        expect(resforUpdate.body.Data).toBe("Data Updated");
        
    
    });
});