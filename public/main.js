var publicKey = document.getElementById("pubicKey");
var privateKey = document.getElementById("privateKey");
var btn1 = document.getElementById("getKeys");
var btn2 = document.getElementById("genKeys");
var btn3 = document.getElementById("encrypt");
var btn4 = document.getElementById("decrypt");
var keyUsing; //The JWK pair in current usage
var url = self.location.host;
/*Use the getKey API,
  send "GET: ./api/getKeyPair" request.
  When response, render the HTML with JWK key pair.
  The JWK is randomly choosed from data stored in server.
 */
btn1.addEventListener("click", function(){
    var getKeys = new XMLHttpRequest();
    getKeys.open("GET", "http://"+url +"/api/keys/getKeyPair");
    getKeys.onload = function(){
        var keyPair = JSON.parse(getKeys.responseText);
        clearKeyArea();
        renderPublicKey(publicKey, keyPair);
        renderPrivateKey(privateKey, keyPair);
        keyUsing = keyPair;
    }
    getKeys.send();
});

/*Use the genKey API,
  send "GET: ./api/genKeyPair" request.
  When response, render the HTML with JWK key pair.
  The JWK is randomly generated.
 */
btn2.addEventListener("click", function(){
    var genKeys = new XMLHttpRequest();
    genKeys.open("GET", "http://"+url +"/api/keys/genKeyPair");
    genKeys.onload = function(){
        var keyPair = JSON.parse(genKeys.responseText);
        clearKeyArea();
        renderPublicKey(publicKey, keyPair);
        renderPrivateKey(privateKey, keyPair);
        keyUsing = keyPair;
    }
    genKeys.send();
});

/*Use the encryption API, 
  send "POST: ./api/encryption" request with a plaintext and a JWK public key.
  When response, render the HTML with ciphertext.
*/
btn3.addEventListener("click", function(){
    var plaintext = document.getElementById("plaintext").value;
    var request = new XMLHttpRequest();
    const key = getPubKey(keyUsing);
    var message = {
        "plaintext" : plaintext,
        "publicKey" : key
    };
    var myJSON = JSON.stringify(message);
    request.open("POST", "http://"+url +"/api/encryption/");
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(){
        // var enc = new TextDecoder("utf-8");
        // var result = enc.decode(request.responseText);
        document.getElementById("ciphertext").value="";
        renderText("ciphertext", request.responseText);
    }
    request.send(myJSON);
});

/*Use the decryption API, 
  send "POST: ./api/decryption" request with a ciphertext and a JWK private key.
  When response, render the HTML with plaintext.
*/
btn4.addEventListener("click", function(){
    var ciphertext = document.getElementById("ciphertext").value;
    var request = new XMLHttpRequest();
    const key = getPriKey(keyUsing);
    var message = {
        "ciphertext" : ciphertext,
        "privateKey" : key
    };
    var myJSON = JSON.stringify(message);
    request.open("POST", "http://"+url +"/api/decryption/");
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(){
        // var enc = new TextDecoder("utf-8");
        // var result = enc.decode(request.responseText);
        document.getElementById("plaintext").value="";
        renderText("plaintext", request.responseText);
    }
    request.send(myJSON);
});

function renderText(id, data){
    document.getElementById(id).value= data;
}

//For illustrating Public Key in HTML
function renderPublicKey(id, data){
    var htmlString = "'n': ";
    htmlString += data.n;
    id.value = htmlString;
}

//For illustrating Private Key in HTML
function renderPrivateKey(id, data){
    var htmlString = "";
    htmlString += "'d': " + data.d + "\n";
    htmlString += "'p': " +data.p + "\n";
    htmlString += "'q': " +data.q + "\n";
    htmlString += "'dq': " +data.dq + "\n";
    htmlString += "'dp': " +data.dp + "\n";
    htmlString += "'qi': " +data.qi + "\n";
    id.value = htmlString;
}

function clearKeyArea(){
    document.getElementById("pubicKey").value="";
    document.getElementById("privateKey").value="";
}
//Return a ligitimated Public JWK
function getPubKey(key){
    const n = key.n;
    const e = key.e;
    const publicKey = {
        "kty" : "RSA",
        "n" : n,
        "e" : e
    }
    return publicKey
}

//Return a ligitimated Private JWK
function getPriKey(key){
    const d = key.d;
    const p = key.p;
    const q = key.q;
    const dq = key.dq;
    const qi = key.qi;
    const dp = key.dp;
    const e = key.e;
    const n = key.n;
    const privateKey = {
        "kty" : "RSA",
        "n" : n,
        "e" : e,
        "d" : d,
        "p" : p,
        "q" : q,
        "dq" : dq,
        "qi" : qi,
        "dp" : dp
    }
    return privateKey
}