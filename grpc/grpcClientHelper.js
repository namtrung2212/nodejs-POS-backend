
var grpc = require('grpc');
var path = require("path");
const fs = require('fs');
var config = require(__dirname + '/../config');

var exports = module.exports = {};
var systemClient = {}
var businessClients = new Map();
exports.SystemClient = systemClient;
exports.BusinessClients = businessClients;


exports.connect = function (isSecure) {

    exports.connectToSystem(isSecure);
    exports.connectToBusinesses(isSecure);

};

exports.connectToSystem = function (isSecure) {

    var proto = grpc.load(path.resolve(__dirname + "/proto/system.proto"));

    var credentials = null;

    if (isSecure) {
        var certPath = path.resolve(__dirname + '/../certs/server.crt');
        let credentials = grpc.credentials.createSsl(fs.readFileSync(certPath));

    } else {
        credentials = grpc.credentials.createInsecure();
    }

    var serverConfig = config.getServer("srv_sys");
    var address = serverConfig.ExternalAdr + ":" + serverConfig.port;

    systemClient.AuthenService = new proto.Authen.AuthenService(address, credentials);
    systemClient.BillingService = new proto.Billing.BillingService(address, credentials);
    systemClient.CompanyService = new proto.Company.CompanyService(address, credentials);

};


exports.connectToBusinesses = function (isSecure) {

    var proto = grpc.load(path.resolve(__dirname + "/proto/business.proto"));

    var credentials = null;

    if (isSecure) {
        var certPath = path.resolve(__dirname + '/../certs/server.crt');
        let credentials = grpc.credentials.createSsl(fs.readFileSync(certPath));

    } else {
        credentials = grpc.credentials.createInsecure();
    }

    for (var i = 0; i < config.Servers.length; i++) {

        if (config.Servers[i].type == "business") {

            var serverAdr = config.Servers[i].ExternalAdr + ":" + config.Servers[i].port;

            var client = {}
            client.SaleOrderService = new proto.Sale.SaleOrderService(serverAdr, credentials);
            client.PurchaseOrderService = new proto.Purchase.PurchaseOrderService(serverAdr, credentials);

            businessClients.set(config.Servers[i].name, client);
        }
    }


};


exports.response = function (error, result, callback) {

    callback(null, { error: error, result: JSON.stringify(result), res_at: new Date().getTime() });

};

