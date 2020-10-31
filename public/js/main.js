var publicKey = document.getElementById("pubicKey");
var privateKey = document.getElementById("privateKey");
var btn1 = document.getElementById("getKeys");
var btn2 = document.getElementById("genKeys");
var btn3 = document.getElementById("encrypt");
var btn4 = document.getElementById("decrypt");
var keyUsing; //The JWK pair in current usage
// var userData = JSON.parse('<%- JSON.stringify(user) %>'); 

/*Use the getKey API,
  send "GET: ./api/getKeyPair" request.
  When response, render the HTML with JWK key pair.
  The JWK is randomly choosed from data stored in server.
 */
btn1.addEventListener("click", function(){
    var getKeys = new XMLHttpRequest();
    getKeys.open("GET", "http://localhost:9000/api/keys/getKeyPair");
    //getKeys.open("GET", "https://mighty-waters-04779.herokuapp.com/api/keys/getKeyPair");
    getKeys.onload = function(){
        if(this.status == 200){
            var keyPair = JSON.parse(getKeys.responseText);
            clearKeyArea();
            renderPublicKey(publicKey, keyPair);
            renderPrivateKey(privateKey, keyPair);
            keyUsing = keyPair;
        }
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
    genKeys.open("GET", "http://localhost:9000/api/keys/genKeyPair");
    //genKeys.open("GET", "https://mighty-waters-04779.herokuapp.com/api/keys/genKeyPair");
    genKeys.onload = function(){
        if(this.status == 200){
            var keyPair = JSON.parse(genKeys.responseText);
            clearKeyArea();
            renderPublicKey(publicKey, keyPair);
            renderPrivateKey(privateKey, keyPair);
            keyUsing = keyPair;
        }
    }
    genKeys.send();
});

/*Use the encryption API, 
  send "POST: ./api/encryption" request with a plaintext and a JWK public key.
  When response, render the HTML with ciphertext.
*/
btn3.addEventListener("click", function(){
   if(document.getElementById("plaintext").value == ""){
    window.alert("You need to input plaintext");
    document.getElementById("plaintext").value="";
   }else if((document.getElementById("pubicKey").value !=="")&&(document.getElementById("privateKey").value!=="")){
    var plaintext = document.getElementById("plaintext").value;
    var request = new XMLHttpRequest();
    const key = getPubKey(keyUsing);
    var message = {
        "plaintext" : plaintext,
        "publicKey" : key
    };
    var myJSON = JSON.stringify(message);
    request.open("POST", "http://localhost:9000/api/encryption/");
    //request.open("POST", "https://mighty-waters-04779.herokuapp.com/api/encryption/");
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(){
        if(this.status == 200){
            document.getElementById("ciphertext").value="";
            renderText("ciphertext", textToList(request.responseText));
         }else if(this.status == 400){
             document.getElementById("plaintext").value="";
             document.getElementById("ciphertext").value="";
             window.alert("The key pair is illegal!");
         }

    }
    request.send(myJSON);
   }else{
    window.alert("You need to get a pair of keys");
    document.getElementById("plaintext").value="";
   }
});

/*Use the decryption API, 
  send "POST: ./api/decryption" request with a ciphertext and a JWK private key.
  When response, render the HTML with plaintext.
*/
btn4.addEventListener("click", function(){
    if(document.getElementById("ciphertext").value == ""){
        window.alert("You need to input ciphertext");
        document.getElementById("ciphertext").value="";
    }else if((document.getElementById("pubicKey").value !=="")&&(document.getElementById("privateKey").value!=="")){
        var ciphertext = document.getElementById("ciphertext").value;
        var request = new XMLHttpRequest();
        const key = getPriKey(keyUsing);
        var message = {
            "ciphertext" : ciphertext,
            "privateKey" : key
        };
        var myJSON = JSON.stringify(message);
        request.open("POST", "http://localhost:9000/api/decryption/");
        //request.open("POST", "https://mighty-waters-04779.herokuapp.com/api/decryption/");
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function(){
            if(this.status == 200){
               renderText("plaintext", this.responseText);
            }else if(this.status == 400){
                document.getElementById("plaintext").value="";
                document.getElementById("ciphertext").value="";
                window.alert("The ciphertext is illegal!");
            }
        }
        request.send(myJSON);
    }else{
        window.alert("You need to get a pair of keys");
        document.getElementById("ciphertext").value="";
    }
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
function textToList(text){
    var ciphertext = JSON.parse(text)
    //var ciphertext = text;
    //console.log(ciphertext);
    var result = new Array();
    for(var i = 0; i<256;i++){
        result.push(ciphertext[i]);
    }
    return result
}
