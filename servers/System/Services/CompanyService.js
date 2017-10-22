var exports = module.exports = {};

exports.init = function(server,proto){
    
    server.addService(proto.Company.CompanyService.service, {
        getCompanys: function(call, callback) {
            callback(null, {items : [],res_at : new Date().getTime()});
        }
    });
};