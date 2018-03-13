
var grpc = require('grpc');
var path = require("path");
const fs = require('fs');
var public = module.exports = {};

public.initServices = function (services) {

    public.services = services;
    services.server = public;
}

public.start = function (address, isSecure) {

    var proto = grpc.load(path.resolve(__dirname + "/base.proto"));
    var server = new grpc.Server();
    server.addService(proto.base.GRPCService.service, {
        execute: public.services.handler
    });

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

    server.start();
    return server;
};


public.onCalled = async function (handler, call, cb) {

    let data = await handler(call.request).catch(error => {
        console.log(error)
        cb(null, REST.newRes({ error: JSON.stringify(error) }));
    });

    if (!data) {
        cb(null, { error: "", result: "", res_at: new Date().getTime() });
        return;
    }

    if ("result" in data && "error" in data)
        cb(null, { error: data.error == null ? "" : data.error, result: JSON.stringify(data.result), res_at: new Date().getTime() });

    else if ("data" in data && "error" in data)
        cb(null, { error: data.error == null ? "" : data.error, result: JSON.stringify(data.data), res_at: new Date().getTime() });

    else
        cb(null, { error: "", result: JSON.stringify(data), res_at: new Date().getTime() });

};
