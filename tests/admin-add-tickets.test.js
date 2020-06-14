const ticketModel = require('../models/ticket-details');
const {User}=require('../models/user');
const request = require('supertest');
var token;
describe('/routes/adminaddticket',()=>{
    beforeEach(async ()=>{server = require('../api');
    token=await request(server)
                .post('/register')
                .send({
                    "name":"yebodys",
                    "email":"abcd@hyperverge.com",
                    "password":"123456"
                });
})
    afterEach(async ()=>{await server.close();
        await ticketModel.deleteMany({});
        await User.deleteMany({});
    });
    it('should return response for added tickets by admin',async ()=>{
    
        let res = await request(server)
                        .post('/adminaddtickets')
                        .set({'x-auth-token' : token.body.key});
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("saved");

        res = await request(server)
                    .post('/adminaddtickets')
                    .set({'x-auth-token' : token.body.key});;
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Tickets already exist");


    });
});