const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userDetailsSchema = new Schema({

    email:{          //email of user who sends jwt token/logged in 
        type:String
    },
    name: {              // name of traveller
        type: String
    },
    age:{                 // age of traveller
        type:Number
    },
    source:{               //source of traveller
         type: String
    },
    destination:{           // destination of traveller
        type:String
    }

})

exports.ticketUserDetails=userDetailsSchema