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
        var ciphertext = new Uint8Array();
        //ciphertext = stringToUint(req.body.ciphertext);
        ciphertext = ArrayBuffer.from(req.body.ciphertext);
        console.log(ciphertext);
        var privateKey = req.body.privateKey;
        console.log(privateKey);
        usingKey.decrypt(ciphertext, privateKey).then((result) => {
            const decoder = new StringDecoder('utf8');
            var message = decoder.write(result);
            console.log(message);
            return message
        }).then((message) => res.send(message));

    }catch(err){
        console.log(err);
        return res.status(400).json({msg:'Error'});
    }
    
})


function stringToUint(string) {
    //var string = btoa(unescape(encodeURIComponent(string))),
    //Buffer.from(unescape(encodeURIComponent(string))).toString('base64')
    var string = Buffer.from(unescape(encodeURIComponent(string))).toString('base64'),
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}
module.exports = router;