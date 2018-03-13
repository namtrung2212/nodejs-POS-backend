
var system = require("../../grpc/grpcClient");
system.connectToSystem(false);

var config = require('../../config');
var server = require("../../grpc/grpcServer");
var servername = "srv_bus1";

var services = require("./services");
services.init();

let dbConfig = config.getMySQLConfig(servername);
services.connectDB(dbConfig);

let dbSysConfig = config.getMySQLConfig("srv_sys");
services.connectDB(dbSysConfig);

server.initServices(services);

var srvConfig = config.getServer(servername);
var adr = srvConfig.LocalAdr + ":" + srvConfig.port;
server.start(adr, false);

console.log('Business Server ' + srvConfig.name + ' running at ' + adr);

