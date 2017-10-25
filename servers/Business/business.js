const fs = require('fs');
var grpc = require('grpc');
var config = require('../../config');
var clientHelper = require("../../grpc/grpcClientHelper");
var serverHelper = require("../../grpc/grpcServerHelper");

clientHelper.connectToSystem(false);

var serverConfig = config.getServer("srv_bus1");
var address = serverConfig.LocalAdr + ":" + serverConfig.port;

var services = require("./services");
var server = serverHelper.initServer(address,services,false);
server.start();
console.log('Business Server ' + serverConfig.name + ' running at ' +address);

