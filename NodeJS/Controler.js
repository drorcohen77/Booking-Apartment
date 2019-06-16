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