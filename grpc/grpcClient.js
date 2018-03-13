
var grpc = require('grpc');
var path = require("path");
var fs = require('fs');
var config = require(__dirname + '/../config');
var DAL = require("../helpers/MySQLHelper")
var UUID = require("../helpers/UUIDHelper")
var REST = require("../helpers/RESTHelper")
var JWT = require("../helpers/JWTHelper");

var public = module.exports = {};
var systemClient = {}
var businessClients = new Map();
public.system = systemClient;
public.business = businessClients;

public.load = function (protoPath) {

    return grpc.load(protoPath);
};

public.connect = function (isSecure) {

    public.connectToSystem(isSecure);
    public.connectToBusinesses(isSecure);

};

public.connectToSystem = function (isSecure) {

    var proto = grpc.load(path.resolve(__dirname + "/base.proto"));

    var credentials = null;

    if (isSecure) {
        var certPath = path.resolve(__dirname + '/../certs/server.crt');
        let credentials = grpc.credentials.createSsl(fs.readFileSync(certPath));

    } else {
        credentials = grpc.credentials.createInsecure();
    }

    var serverConfig = config.getServer("srv_sys");
    var address = serverConfig.ExternalAdr + ":" + serverConfig.port;

    systemClient.GRPCService = new proto.base.GRPCService(address, credentials);

};


public.connectToBusinesses = function (isSecure) {

    var proto = grpc.load(path.resolve(__dirname + "/base.proto"));

    var credentials = null;

    if (isSecure) {
        var certPath = path.resolve(__dirname + '/../certs/server.crt');
        let credentials = grpc.credentials.createSsl(fs.readFileSync(certPath));

    } else {
        credentials = grpc.credentials.createInsecure();
    }

    for (var i = 0; i < config.Servers.length; i++) {

        if (config.Servers[i].type == "business") {

            var serverAdr = config.Servers[i].ExternalAdr + ":" + config.Servers[i].port;

            var client = {}
            client.GRPCService = new proto.base.GRPCService(serverAdr, credentials);
            businessClients.set(config.Servers[i].name, client);
        }
    }


};

public.getBusServerByID = function (id) {

    let dbNum = UUID.getDBNum(id);
    let srvName = "srv_bus" + dbNum;
    let server = businessClients.get(srvName);
    return server;
}

public.getBusServer = async function (req) {

    let busId = await REST.getBusIDFromToken(req);
    let server = public.getBusServerByID(busId);
    return server;
}

public.response = function (error, result, cb) {

    cb(null, { error: error == null ? "" : error, result: JSON.stringify(result), res_at: new Date().getTime() });

};

public.genParams = async function (entity, method, params, resCb) {

    var params = { entity: entity, method: method, params: JSON.stringify(params), req_at: new Date().getTime() };
    return resCb ? [params, resCb] : [params];
};

public.execute = async function (server, entity, method, params, cb) {

    let execParams = await public.genParams(entity, method, params);

    return new Promise(resolver => {
        server.GRPCService.execute(...execParams, cb ? cb : function (error, result) {

            var err = error ? error : ((result != null && result.error) ? result.error : null);
            if (err)
                resolver(DAL.newRes({ error: err }));
            else if (result.result)
                resolver(JSON.parse(result.result));
            else
                resolver(DAL.newRes(null));

        });
    });

};