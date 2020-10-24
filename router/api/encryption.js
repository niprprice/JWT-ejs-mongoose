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
        var plaintext = new Uint8Array();
        plaintext = stringToUint(req.body.plaintext);
        console.log(plaintext);
        var publicKey = req.body.publicKey;
        console.log(publicKey);
        console.log("\nLength of n:" + publicKey.n.length);
        usingKey.encrypt(plaintext, publicKey).then((result) => {
            // console.log(result);
            // console.log("\nLength of Cipher Array:" + result.length);
            // const decoder = new StringDecoder('utf8');
            // var message = decoder.write(result);
            // console.log(message);
            // console.log("\nLength of Cipher Text:" + message.length);
            return result
        }).then((message) => res.send(message));

    }catch(err){
        console.log(err);
        return res.status(400).json({msg:'Error'});
    }
    
})

//Converting a String to a Unit8Array object
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