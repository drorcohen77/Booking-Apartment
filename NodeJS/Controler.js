const PORT = process.env.PORT || 3002;

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');

const fs = require("fs"); //for wirte tinto file

const cookieParser = require('cookie-parser');
const multer = require('multer'); //for uploading pictures
const path = require('path');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');


// MongoDB:

const config = require('./config/dev.js');
const MongoClient = require('mongoose');
const FakeDb = require('./fak-db');

const server = async() => {
    try {
        await MongoClient.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
            const fakeDb = new FakeDb();
            fakeDb.seeDb();
        });
    } catch (err) {
        console.log(err);
    }
}

server();

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

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);


app.listen(PORT, () => {
    console.log('Server is runnig');
});