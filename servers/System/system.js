
var businesses = require("../../grpc/grpcClient");
businesses.connectToBusinesses(false);

var config = require('../../config');
var server = require("../../grpc/grpcServer");
var servername = "srv_sys";

var services = require("./services");
let dbConfig = config.getMySQLConfig(servername);
services.init(dbConfig);
server.initServices(services);

var srvConfig = config.getServer(servername);
var adr = srvConfig.LocalAdr + ":" + srvConfig.port;
server.start(adr, false);

console.log('System Server running at ' + adr);