const fs = require('fs');
var grpc = require('grpc');
var config = require('../../config');
var clientHelper = require("../../grpc/grpcClientHelper");
var serverHelper = require("../../grpc/grpcServerHelper");

var address = config.SystemNodeLocalAdr;
var services = require("./services");
var server = serverHelper.initServer(address,services,false);
server.start();
console.log('System Server running at '+ config.SystemNodeLocalAdr);

clientHelper.connectToBusinesses(false);