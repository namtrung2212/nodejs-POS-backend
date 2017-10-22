var exports = module.exports = {};

exports.init = function(server,proto){
    
    server.addService(proto.Sale.CashSaleService.service, {
        getCashSales: function(call, callback) {
            callback(null, {orders : [],res_at : new Date().getTime()});
        }
    });
};
    