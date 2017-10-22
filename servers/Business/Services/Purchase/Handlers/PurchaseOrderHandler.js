var exports = module.exports = {};

exports.init = function(server,proto){
    
    server.addService(proto.Purchase.PurchaseOrderService.service, {
        getOrders: function(call, callback) {
            callback(null, {orders : [],res_at : new Date().getTime()});
        }
    });
    
};
    