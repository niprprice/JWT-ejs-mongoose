const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9000;
const mongoose = require('mongoose');
const ejs = require('ejs');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

const indexRouter = require('./router/index');
const userRouter = require('./router/user');


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
app.use('/register', require('./router/api/register.js'));
app.use('/api/keys', require('./router/api/keys.js'));
app.use('/api/encryption', require('./router/api/encryption.js'));
app.use('/api/decryption', require('./router/api/decryption.js'));
app.use('/', indexRouter);
app.use('/api', userRouter);
// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
//   });
  
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//       error: {
//         message: error.message
//       }
//     });
//   });

app.listen(PORT, () => console.log("Server started"));




