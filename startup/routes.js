const cors=require('cors');
const bodyParser=require('body-parser');
const resetRouter=require('../routes/tickets/admin-reset');
const adminAddTickets=require('../routes/tickets/admin-add-tickets');
const viewOpenTicket=require('../routes/tickets/view-open-tickets');
const viewClosedTicket=require('../routes/tickets/view-closed-tickets');
const checkTicketStatus=require('../routes/tickets/check-ticket-status');
const ticketUserDetails=require('../routes/tickets/ticket-user-details');
const updateTicket=require('../routes/tickets/update-ticket'); 
const newTickets=require('../routes/tickets/new-ticket');
const registerUser=require('../routes/user/register-users');
const authUser=require('../routes/user/auth-users');
const error = require('../middleware/error');



module.exports=function(app){
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*tickets routes*/
app.use('/updateTicket',updateTicket);
app.use('/adminReset',resetRouter);
app.use('/adminAddTickets',adminAddTickets);
app.use('/viewOpenTickets',viewOpenTicket);
app.use('/viewClosedTickets',viewClosedTicket);
app.use('/checkTicketStatus',checkTicketStatus);
app.use('/ticketUserDetails',ticketUserDetails);
app.use('/newTicket',newTickets);
/*user routes*/
app.use('/register',registerUser);
app.use('/login',authUser);
/*error*/
app.use(error);

}