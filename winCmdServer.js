// npm init
// package.json
// npm install express --save

"use strict"

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

app.get('/files', function (req, res) {
    res.send(JSON.stringify(data.getFiles()));
});

app.post('/createFile', function (req, res) {
    let fileToAdd = req.body;
    data.addFile(fileToAdd);
    res.send({});
});

app.post('/renameFile', function (req, res) {
    let fileToRename = req.body;
    data.renameFile(fileToRename.id, fileToRename.name, fileToRename.ext);
    res.send({});
});


// The app works on port 8080
app.listen(8080, function () {});

let data = new function() {
    let files = [
        { id:0, name: 'a', ext: 'txt', size: 1 },
        { id:1, name: 'bbb', ext: 'txt', size: 10 },
        { id:2, name: 'v', ext: 'bat', size: 100 },
        { id:3, name: 'ggg', ext: 'git', size: 1000 },
        { id:4, name: 'hhh', ext: 'gif', size: 10000 },
        { id:5, name: 'za', ext: 'txt', size: 2 },
        { id:6, name: 'zbbb', ext: 'txt', size: 20 },
        { id:7, name: 'zv', ext: 'bat', size: 200 },
        { id:8, name: 'zggg', ext: 'git', size: 2000 },
        { id:9, name: 'zhhh', ext: 'gif', size: 20000 }
    ];

    this.getFiles = function() {
        return files;
    };

    this.renameFile = function(id, newName, newExt) {
        (function(file) {
            file.name = newName;
            file.ext = newExt;
        })(files.find(file => file.id == id));
    };

    this.addFile = function(file) {
        file.id = files.reduce((max, file) => max = Math.max(max, file.id), 0) + 1;
        file.size = 0;
        files.push(file);
    }

};