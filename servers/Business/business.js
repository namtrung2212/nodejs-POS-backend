const fs = require('fs');
var grpc = require('grpc');
var config = require('../../config');
var clientHelper = require("../../grpc/grpcClientHelper");
var serverHelper = require("../../grpc/grpcServerHelper");

clientHelper.connectToSystem(false);

var address = config.getCurrentBusinessServer().LocalAdr;
var services = require("./services");
var server = serverHelper.initServer(address,services,false);
server.start();
console.log('Business Server ' + config.BusinessNodeIndex + ' running at ' +address);

