const fs = require('fs');
var grpc = require('grpc');
var config = require('../../config');
var clientHelper = require("../../grpc/grpcClientHelper");
var serverHelper = require("../../grpc/grpcServerHelper");
var services = require("./services");
var MySQLHelper = require("../../helpers/MySQLHelper");

var serverConfig = config.getServer("srv_sys");
var address = serverConfig.LocalAdr + ":" + serverConfig.port;
var server = serverHelper.initServer(address,services,false);
server.start();

clientHelper.connectToBusinesses(false);
MySQLHelper.connect("srv_sys",config.getMySQLConfig("srv_sys"));

console.log('System Server running at '+ address);