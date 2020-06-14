const ticketModel = require('../models/ticket-details');
const request = require('supertest');
const {User}=require('../models/user');
var token ;

describe('/routes/checkticketstatus',()=>{
    beforeEach(async ()=>{server = require('../api');
    token=await request(server)
    .post('/register')
    .send({
        "name":"yebodys",
        "email":"abcd@google.com",
        "password":"123456"
    });
});
    afterEach(async ()=>{await server.close();
        await ticketModel.deleteMany({});
        await User.deleteMany({});
    });
    it('should return response for a ticket close or open',async ()=>{
        await ticketModel.collection.insertMany([
            {ticketNo:1,available:false,userDetails:[{email:"abcd@google.com",name:"Ram",age:"43",source:"ahm",destination:"bom"}]},
            {ticketNo:2,available:true}
        ]);
        const resforClose = await request(server)
                                .get('/checkticketstatus')
                                .send({"ticketNo":1})
                                .set({'x-auth-token' : token.body.key});
    

        expect(resforClose.status).toBe(200);
        expect(resforClose.body.Data).toBe("close");
        
        const resforOpen = await request(server)
                                .get('/checkticketstatus')
                                .send({"ticketNo":2})
                                .set({'x-auth-token' : token.body.key});

        expect(resforOpen.status).toBe(200);
        expect(resforOpen.body.Data).toBe("open");
        
    
    });
});