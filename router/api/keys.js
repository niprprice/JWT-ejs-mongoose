const express = require('express');
const usingKey = require('../../keyUsage/rsa.js');
const keys = require('../../data/keys.js');
const router = express.Router();
const JWK = require('../../DBmodle/jwk.js');
/*API for "GET: ./api/getKeyPair" request
  response with a randomly choosed stored JWK pair
*/
router.post('/getKeyPair', (req, res) => {
  try{
    var token = req.body.token;
    console.log("Token: " + token);
    JWK.findOne({ token : token }).exec()
    .then(key =>{
      if(key){
        console.log(key);
        res.status(200).send(key.key);
      }else{
        res.status(400).json({msg:"You don't have a stored key yet!"});
      }
    });
    //res.status(200).json(keys.getRandomKey().keys[0])
  }catch{(error) =>{
    console.log(error);
    return res.status(400).json({msg:'Error'});
  }};
})

/*API for "GET: ./api/genKeyPair" request
  response with a randomly generated JWK pair
*/
router.get('/genKeyPair', (req, res) => {
  usingKey.genKey().then((key) => res.status(200).send(key))
  .catch((error) =>{
    console.log(error);
    return res.status(400).json({msg:'Error'});
  });
})


router.post('/storekeys', (req, res) => {
  try{
    var token = req.body.token;
    console.log("Token: " + token);
    var key = JSON.stringify(req.body.key);
    JWK.findOne({ token : token }).exec()
    .then(k =>{
      if(k){
        console.log("Found a stored key");
        JWK.updateOne({token : token}, {key : key})
        .then(res.status(200).json({msg:'Success!'}))
      }else{
        const newKey = new JWK({
          token : token,
          key : key
        });
        console.log(key);
        //save key
        newKey.save().then(res.status(200).json({msg:'Success!'}));
      }
    });
    //res.status(200).json(keys.getRandomKey().keys[0])
  }catch{(error) =>{
    console.log(error);
    return res.status(400).json({msg:'Error'});
  }};

})

 module.exports = router;