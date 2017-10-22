
var SaleOrderHandler     =   require("./Handlers/SaleOrderHandler");
var CashSaleHandler     =   require("./Handlers/CashSaleHandler");

var exports = module.exports = {};

exports.init = function(server,proto){
    
    SaleOrderHandler.init(server,proto);
    CashSaleHandler.init(server,proto);

};