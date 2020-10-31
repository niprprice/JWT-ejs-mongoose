const express = require('express');
const router = express.Router();
//User model
const User = require('../DBmodle/user.js');

router.get('', (req,res) =>{
    try{
        if(req.body.token){
            var token = String(req.body.token);
            console.log("Token: " + token);    
            var message = {user:''}; 
            User.findOne({ token : token }).exec()
                .then(user =>{
                    if(user){
                        var username = user.username;
                        var str = "Hello, " + username;
                        message.user = str;
                        console.log(message);
                        return message;
                    }else{
                        message.user = "NOT FOUND";
                        console.log(message);
                        return message;
                    }
                })
                .then((result) => {res.render('useCase', result)});
        }else{
            res.render("useCase", {user: "???"});
        }
        
    }catch(err){
        console.log(error);
        return res.status(400).json({msg : error});
    }
})


module.exports = router;