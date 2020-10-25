const express = require('express');
const usingKey = require('../../keyUsage/rsa.js');
const router = express.Router();
//const btoa = require('btoa');
const { StringDecoder } = require('string_decoder');

/*API for "POST: ./encryption/" request with a plaintext and a public JWK,
  response with the ciphertext in Unit8Array format.
  Description about JWK and encryption in https://tools.ietf.org/html/rfc7638
*/
router.post('/', (req,res) =>{
    try{
        console.log("Plaintext: " + String(req.body.plaintext));
        plaintext = new Uint8Array(Buffer.from(req.body.plaintext));
        console.log(plaintext);
        var publicKey = req.body.publicKey;
        console.log(publicKey);
        console.log("\nLength of n:" + publicKey.n.length);
        usingKey.encrypt(plaintext, publicKey).then((result) => {
            console.log(result);
            return result
        }).then((message) => res.send(message));

    }catch(err){
        console.log(err);
        return res.status(400).json({msg:'Error'});
    }
    
})


module.exports = router;