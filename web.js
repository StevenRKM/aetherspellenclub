// web.js
var express = require("express");
var httpProxy = require('http-proxy');
var logfmt = require("logfmt");
var fs = require('fs');

var BGGProxy = httpProxy.createServer(80, 'boardgamegeek.com');
var app = express();

app.use(logfmt.requestLogger());

app.configure(function(){
    app.use('/', express.static(__dirname + '/'));
    app.use('/bggapi', BGGProxy);
});

app.get('/alive', function(req, res) {
  res.send('I am alive :)');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});