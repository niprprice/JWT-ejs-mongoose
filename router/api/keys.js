const express = require('express');
const usingKey = require('../../keyUsage/rsa.js');
const keys = require('../../data/keys.js');
const router = express.Router();

/*API for "GET: ./api/getKeyPair" request
  response with a randomly choosed stored JWK pair
*/
router.get('/getKeyPair', (req, res) => {
    try{
      res.status(200).json(keys.getRandomKey().keys[0])
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

 module.exports = router;