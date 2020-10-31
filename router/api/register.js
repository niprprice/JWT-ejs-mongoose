const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
//User model
const User = require('../../DBmodle/user.js');

//router.get("/signup", (req,res) => res.render('index'));
//router.get("/signin", (req,res) => res.render('index'));

router.post("/signup", (req,res) => {
    try{
        console.log('User:' + JSON.stringify(req.body));
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            console.log('Please fill in all fields');
            res.status(400).json({msg : 'Please fill in all fields'});
        }else{
            User.findOne({ email : email }).exec()
            .then(user =>{
                if(user){
                    //If user exist
                    console.log('Email is already registered!');
                    //res.render('index', {emailExist: "Email existed"});
                    //throw new Error('Email is already registered!');
                    res.status(400).json({msg:'Email is already registered!'});
                }else {
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
                    newUser.save().then(result => res.status(200).json({msg:'Success!'}));
                }
            })
            .catch(err => {
                res.status(400).json({msg: err})
            });
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
            res.status(400).json({msg : 'Please fill in all fields'});
        }else{
            const token = jwt.sign(password, email);
            console.log(token);
            User.find({ email : email , token :token}).exec()
            .then(user =>{
                if(user){
                    var message = {token : token};
                    console.log(message);
                    res.status(200).json(message);
                    //res.redirect('/api');
                    //res.render("useCase");
                }else {
                    res.status(400).json({msg: "Error"});
                }
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


// async function signUp(username, email, password){
//     var result;
//     user = await User.findOne({ email : email }).exec()
//     if(user){
//         //If user exist
//         console.log('Email is already registered!');
//         result = { code:400, msg:'Email is already registered!' };
//     }else{
//         //Default HMAC SHA256 signature
//         const token = jwt.sign(password, email);
//         console.log(token);
//         const newUser = new User({
//             username : username,
//             email : email,
//             password : password,
//             token : token
//         })
//         console.log(newUser);
//         //save user
//         await newUser.save();
//         result = { code:200, msg:'Success!' };
//     }
// return result;
// }

// router.get("/", (req, res, next) => {
//     Product.find().exec()
//       .then(docs => {
//         console.log(docs);
//           if (docs.length >= 0) {
//             res.status(200).json(docs);
//           } else {
//               res.status(404).json({
//                   message: 'No entries found'
//               });
//           }
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   });

module.exports = router;