const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9000;
const mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// app.get('/', (req,res) =>{
//     res.render('index');
// })
const indexRouter = require('./router/index');
app.use('/', indexRouter);

//Database configuration
const db = require('./DBconfig/DBkey.js').MongoURI;

//Connect DB
mongoose.connect(db, { useNewUrlParser : true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


//Routing
app.use('/api/keys', require('./router/api/keys.js'));
app.use('/api/encryption', require('./router/api/encryption.js'));
app.use('/api/decryption', require('./router/api/decryption.js'));
app.use('/api/register', require('./router/api/register.js'));

app.listen(PORT, () => console.log("Server started"));




