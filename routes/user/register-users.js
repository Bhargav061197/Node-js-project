const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express')
const router = express.Router();
const {User,validate} = require('../../models/user');

router.post('/',async (req,res)=>{
     

     const{error}=validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     
     let user = await User.findOne({email:req.body.email});
     if(user) return res.status(400).send('User already registered');
     
     
     user = new User(_.pick(req.body,['name','email','password']));
          
     const salt=await bcrypt.genSalt(10);
     user.password=await bcrypt.hash(user.password,salt);

     if(user.email.endsWith('@admin.com')) user.isAdmin=true;  //Indicating @admin.com domain email is an admin
     await user.save();
     
     
     const token = user.generateAuthToken();
     res.send({msg:"registration success",key:token});

} );



module.exports=router;