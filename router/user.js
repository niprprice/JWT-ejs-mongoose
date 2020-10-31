const express = require('express');
const router = express.Router();
//User model
const User = require('../DBmodle/user.js');

/**API for routing the registration page to function page with crypto methods.
 * Return with a rendered page.
 */

router.post('', (req,res) =>{
    try{
        if(req.body.token){
            var token = String(req.body.token);
            console.log("Token: " + token);    
            var message = {user:'', token:''}; 
            User.findOne({ token : token }).exec()
                .then(user =>{
                    if(user){
                        var username = user.username;
                        var str = "Hello, " + username;
                        message.user = str;
                        message.token = token;
                        console.log(message);
                        return message;
                    }else{
                        message.user = "NOT FOUND";
                        message.token = "";
                        console.log(message);
                        return message;
                    }
                })
                .then((result) => {res.render('useCase', result)});
        }else{
            res.render("useCase", {user: "", token:""});
        }
        
    }catch(err){
        console.log(error);
        return res.status(400).json({msg : error});
    }
})


module.exports = router;