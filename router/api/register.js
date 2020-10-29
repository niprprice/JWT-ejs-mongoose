const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
//User model
const User = require('../../DBmodle/user.js');

router.get("/signup", (req,res) => res.render('index'));
router.get("/signin", (req,res) => res.render('index'));

router.post("/signup", (req,res) => {
    try{
        console.log('User:' + JSON.stringify(req.body));
        const { username, email, password } = req.body;
        console.log('username:' + username);
        if(!username || !email || !password){
            console.log('Please fill in all fields');
            res.status(400).send({msg : 'Please fill in all fields'});
        }else{
            signUp(res, username, email, password);
            // User.findOne({ email : email })
            // .then((user) =>{
            //     if(user !== null){
            //         //If user exist
            //         console.log('Email is already registered!');
            //         //res.render('index', {emailExist: "exist"});
            //         throw new Error('Email is already registered!');
            //     }else {
            //         //Default HMAC SHA256 signature
            //         const token = jwt.sign(password, email);
            //         console.log(token);
            //         var message = "";
            //         const newUser = new User({
            //             username : username,
            //             email : email,
            //             password : password,
            //             token : token
            //         })
            //         console.log(newUser);
            //         //save user
            //         newUser.save();
            //     }
            // }).then(res.status(200).json({msg:'Success!'}))
            // .catch(err => {
            //     res.status(400).json({msg: err})
            // });
        }
    }catch{(error) =>{
        console.log(error);
        return res.status(400).json({msg : error});
    }};
})

router.post("/signin", (req,res) => {
    try{
        console.log('User:' + JSON.stringify(req.body));
        const { email, password } = req.body;
        if(!email || !password){
            console.log('Please fill in all fields');
            res.status(400).send({msg : 'Please fill in all fields'});
        }else{
            const token = jwt.sign(password, email);
            console.log(token);
            User.find({ email : email , token :token})
            .then((user) =>{
                if(user){
                    var message = {token : token};
                    console.log(message);
                    return message;
                }else {
                    throw new Error("Invalid message!");
                }
            })
            .then((message) => {
                //res.status(200).json(message);
                res.status(200).json({token: token})
            })
            .catch((error) =>{
                console.log(error);
                res.status(400).json({msg : error})
            });
        }
    }catch{(error) =>{
        console.log(error);
        return res.status(400).send({msg : error});
      }};
});


async function signUp(res, username, email, password){
    let a = await User.findOne({ email : email }, function(err, c){
        if(c){
            //If user exist
            console.log('Email is already registered!');
            res.status(400).json({msg : 'Email is already registered!'});
        }else{
            //Default HMAC SHA256 signature
            const token = jwt.sign(password, email);
            console.log(token);
            var message = "";
            const newUser = new User({
                username : username,
                email : email,
                password : password,
                token : token
            })
            console.log(newUser);
            //save user
            newUser.save().then(res.status(200).json({msg : 'Email is already registered!'}));
        }
    });
    return a;
}

module.exports = router;