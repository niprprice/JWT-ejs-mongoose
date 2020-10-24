const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9000

app.listen(PORT, () => console.log("Server started"));

app.use(express.static(path.join(__dirname, '/public')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Routing
app.use('/api/keys', require('./router/api/keys.js'));
app.use('/api/encryption', require('./router/api/encryption.js'));
app.use('/api/decryption', require('./router/api/decryption.js'));



// app.get('/api/getKeyPair', (req, res) => {
//     res.json(keys.getRandomKey().keys[0]);
// })

// app.get('/api/genKeyPair', (req, res) => {
//    //res.json(usingKey.genKey());
//    usingKey.genKey().then((key) => res.send(key));
// })

// app.get('api/encrypt/:plaintext/:key', (req, res) =>{
//     let plaintext = req.params.plaintext;
//     let key = req.params.key;
// })




