const express = require("express");
const multer = require("multer");
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1024mb'}));
app.use(bodyParser.urlencoded({limit: '1024mb', extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, REPORT');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use(multer({storage}).single("filedata"));

app.use('/images', express.static(path.join(__dirname, '../images')));

app.post("/upload", function (req, res, next) {
    if(req.file){
        res.send(`images/${req.file.filename}`);
        
    }else{
        res.send(500);
    }
});

app.listen("80");