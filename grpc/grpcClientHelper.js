
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

    systemClient.AuthenService = new proto.Authen.AuthenService(config.SystemNodeExternalAdr, credentials);
    systemClient.BillingService = new proto.Billing.BillingService(config.SystemNodeExternalAdr, credentials);
    systemClient.CompanyService = new proto.Company.CompanyService(config.SystemNodeExternalAdr, credentials);

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

    for (var i = 0; i < config.BusinessNodes.length; i++) {

        var serverAdr = config.BusinessNodes[i].ExternalAdr;

        var client = {}
        client.SaleOrderService = new proto.Sale.SaleOrderService(serverAdr, credentials);
        client.PurchaseOrderService = new proto.Purchase.PurchaseOrderService(serverAdr, credentials);

        businessClients.set(config.BusinessNodes[i].DBNo, client);
    }


};
