const express = require('express');
const usingKey = require('../../keyUsage/rsa.js');
const router = express.Router();
const { StringDecoder } = require('string_decoder');

/*API for "POST: ./deryption/" request with a ciphertext(Array alike) and a private JWK,
  response with the plaintext in String format.
  Description about JWK and decryption in https://tools.ietf.org/html/rfc7517
*/
router.post('/', (req,res) =>{    
    try{
        console.log("Ciphertext: " + String(req.body.ciphertext));
        const str = req.body.ciphertext;
        const ciphertext = stringToUint(str.toString());
        console.log(ciphertext);
        var privateKey = req.body.privateKey;
        console.log(privateKey);
        usingKey.decrypt(ciphertext, privateKey)
        .then((result) => {
            const decoder = new StringDecoder('utf8');
            var message = decoder.write(result);
            console.log(message);
            return message})
        .then((message) => res.send(message));

    }catch(err){
        console.log(err);
        return res.status(400).json({msg:'Error'});
    }
    
})

/* Convert a string to Unit8Array */
function stringToUint(str) {
    charList = str.split(',');
    return new Uint8Array(Buffer.from(charList))
}
module.exports = router;

