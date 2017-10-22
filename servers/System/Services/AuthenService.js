var exports = module.exports = {};

exports.init = function(server,proto){
            
    server.addService(proto.Authen.AuthenService.service, {
        getUsers: function(call, callback) {

            callback(null, {result : "trung",res_at : new Date().getTime()});

        }
    });
};
    