
var grpc = require('grpc');
var path = require("path");
const fs = require('fs');
var exports = module.exports = {};

exports.initServer = function (address, services, isSecure) {

    var server = new grpc.Server();
    services.init(server);

    if (isSecure) {
   
        var credentials = grpc.ServerCredentials.createSsl(null,
            [{
                private_key: fs.readFileSync(__dirname + '/../certs/server.key'),
                cert_chain: fs.readFileSync(__dirname + '/../certs/server.crt')
            }]);
        server.bind(address, credentials);
   
    } else {
        server.bind(address, grpc.ServerCredentials.createInsecure());
    }

    return server;
};
