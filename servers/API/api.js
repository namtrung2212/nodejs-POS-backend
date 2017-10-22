
var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var router      =   require("./router");
var config = require('../../config');

var grpcClient = require("../../grpc/grpcClientHelper");
grpcClient.connect(false);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',router.load(grpcClient));

var httpServer = http.createServer(app);
httpServer.listen(config.APINodePort);

// HTTPS : use NGINX instead
//var https = require('https');
//var privateKey  = fs.readFileSync('../certs/server.key', 'utf8');
//var certificate = fs.readFileSync('../certs/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};
//var httpsServer = https.createServer(credentials, app);
//httpsServer.listen(8443); 


console.log('API Server running at '+ config.APINodePort);
