const rsa = require('js-crypto-rsa');

/* Generating a random JWK key pair.
   Library from https://www.npmjs.com/package/js-crypto-rsa?activeTab=readme
*/
function genKey() {
    return rsa.generateKey(2048).then((key) => {
        const publicKey = key.publicKey;
        console.log(publicKey);
        const privateKey = key.privateKey;
        console.log(privateKey);
        return privateKey;
    })
}

/* Encrypt message(Unit8Array) with a JWK public key 
    Return the ciphertext in Unit8Array format
*/
function encrypt(msg, pub){
    return rsa.encrypt(msg, pub, 'SHA-256');
}

/* Decrypt ciphertext(Unit8Array) with a JWK private key 
    Return the plaintext in Unit8Array format
*/
function decrypt(msg, pri){
    return rsa.decrypt(msg, pri, 'SHA-256');
}

module.exports = {genKey, encrypt, decrypt};