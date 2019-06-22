const PORT = process.env.PORT || 3001;
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://drorc:!1q2w3e4r@cluster0-l2fyw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require("fs"); //for wirte tinto file

const cookieParser = require('cookie-parser');
const multer = require('multer'); //for uploading pictures
const path = require('path');

// MongoDB:

const url = 'mongodb+srv://drorc:!1q2w3e4r@cluster0-l2fyw.mongodb.net/test?retryWrites=true&w=majority';
const MongoClient = require('mongoose');
MongoClient.connect(url, { useNewUrlParser: true }).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});
// dbo = db.db("mydb");
// dbo.createCollection("mytable")
// customersCollection = dbo.collection("customers");
// studentsCollection = dbo.collection("users");
// console.log("users")
// });

const Rental = require('./models/rental');
// const FakeDb = requestAnimationFrame('./fake-db');

var sess = ''; //for req.session to be recognize with all app's

app.use(cookieParser());
app.use(session({
    secret: '1221312321423423423',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.use(cors(corsOptions))

app.use(bodyParser.json());



// app.get('/apartments', (req, res) => {
//     res.json({ 'uccess': true });
// });



app.listen(PORT, () => {
    console.log('Server is runnig');
})