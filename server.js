var express = require("express");
var mongoose = require("mongoose");
var dbpath = process.env.MONGODB_URI || 'mongodb://localhost:27017/urls' || 'mongodb://gigikent:parola22@ds011482.mlab.com:11482/heroku_ptkbmgr9';
var app = express();
var path = require("path");

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname +'/index.html'));
});

mongoose.connect(dbpath);

var URL = require('./models/url');

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', function (){
    app.get('/new/:url(*)', function(req,res){
        var originalUrl = req.params[0];
        console.log(originalUrl);
        URL.create({original_url: originalUrl}, function(err,urlObj){
            if (err) throw err;
            console.log("new url added:" + urlObj);
            var resObj = {
                original_url: originalUrl,
                short_url: 'https://' +req.hostname + '/' + urlObj._id
            };
            res.end(JSON.stringify(resObj));
        });
    }); 
    
    app.get('/:id', function(req, res) {
        var id = req.params.id;
        URL.find({_id: id}, function(err,urls){
            if (err) throw err;
            var originalUrl = urls[0].original_url;
            res.redirect(originalUrl);
        });
    });
});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function (err,port){
    if(err) throw err;
    console.log('Express listening on port: ' + app.get('port'));
});