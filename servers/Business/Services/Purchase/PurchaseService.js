
var PurchaseOrderHandler     =   require("./Handlers/PurchaseOrderHandler");

var exports = module.exports = {};

exports.init = function(server,proto){
    
    PurchaseOrderHandler.init(server,proto);
};
    
    