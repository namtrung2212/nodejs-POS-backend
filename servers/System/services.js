var AuthenService     =   require("./Services/AuthenService");
var CompanyService     =   require("./Services/CompanyService");
var BillingService     =   require("./Services/BillingService");

var grpc = require('grpc');
var path = require("path");

var exports = module.exports = {};

exports.init = function(server){
    
    var proto = grpc.load(path.resolve(__dirname + "/../../grpc/proto/system.proto"));
   
    AuthenService.init(server,proto);
    CompanyService.init(server,proto);
    BillingService.init(server,proto);
    
};
    
    