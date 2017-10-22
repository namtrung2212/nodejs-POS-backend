var SaleService     =   require("./Services/Sale/SaleService");
var PurchaseService     =   require("./Services/Purchase/PurchaseService");
var ShipmentService     =   require("./Services/Shipment/ShipmentService");
var InventoryService     =   require("./Services/Inventory/InventoryService");
var PartnerBalanceService     =   require("./Services/PartnerBalance/PartnerBalanceService");
var ExpenseService     =   require("./Services/Expense/ExpenseService");
var ConfigureService     =   require("./Services/Configure/ConfigureService");

var grpc = require('grpc');
var path = require("path");

var exports = module.exports = {};

exports.init = function(server){
    
    var proto = grpc.load(path.resolve(__dirname + "/../../grpc/proto/business.proto"));
    
    SaleService.init(server,proto);
    PurchaseService.init(server,proto);
    ShipmentService.init(server,proto);
    InventoryService.init(server,proto);
    PartnerBalanceService.init(server,proto);
    ExpenseService.init(server,proto);
    ConfigureService.init(server,proto);
    
};
    


    