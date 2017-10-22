var exports = module.exports = {};

exports.init = function(server,proto){
          
    server.addService(proto.Billing.BillingService.service, {
        getBillings: function(call, callback) {
            callback(null, {items : [],res_at : new Date().getTime()});
        }
    });
};
    