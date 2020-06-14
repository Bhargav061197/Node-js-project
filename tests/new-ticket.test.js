const ticketModel = require('../models/ticket-details');
const request = require('supertest');
const {User}=require('../models/user');
var token; 

describe('/routes/new ticket',()=>{
    beforeEach(async ()=>{server = require('../api');
    token=await request(server)
    .post('/register')
    .send({
        "name":"yebodys",
        "email":"abcd@hyperverge.com",
        "password":"123456"
    });


    await request(server)
        .post('/adminaddtickets')
        .set({'x-auth-token' : token.body.key});
        
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
    it('should return response for ticket booked successfully or not',async ()=>{
       
        let res = await request(server)
        .post('/newticket')
        .send({
            "Data":[
                {"ticketNo":1,"name1":"a","age":"43","source":"ahm","destination":"bom"},
                {"ticketNo":2,"name":"c","age":"43","source":"ahm","destination":"bom"},
                {"ticketNo":3,"name":"B","age":"43","source":"ahm","destination":"bom"},
                {"ticketNo":4,"name":"h","age":"43","source":"ahm","destination":"bom"},
                {"ticketNo":5,"name":"e","age":"43","source":"ahm","destination":"bom"},
                {"ticketNo":6,"name":"f","age":"43","source":"ahm","destination":"bom"},
                {"ticketNo":7,"name":"m","age":"43","source":"ahm","destination":"bom"}
                ]
        })
        .set({'x-auth-token' : token.body.key});
        
        
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Ticket booked successfully");
        
        res = await request(server)
        .post('/newticket')
        .send({
            "Data":[
                {"ticketNo":7,"name":"z","age":"43","source":"ahm","destination":"bom"}
                ]
        })
        .set({'x-auth-token' : token.body.key});


        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("One or multiple tickets you tried to book have already been booked please refresh page");
        
    
    });
});