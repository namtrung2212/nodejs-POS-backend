var config = {}

config.CurrentServer = "srv_api"; // depend on each server

config.isProductionMode = false; 

config.Servers = [
    { name: "srv_api", type: "api", ExternalAdr: "127.0.0.1", LocalAdr: "0.0.0.0", port: "3005" },
    { name: "srv_sys", type: "system", ExternalAdr: "127.0.0.1", LocalAdr: "0.0.0.0", port: "30252", storage: "sys" },
    { name: "srv_bus1", type: "business", ExternalAdr: "127.0.0.1", LocalAdr: "0.0.0.0", port: "3001", storage: "bus1" },
    { name: "srv_bus2", type: "business", ExternalAdr: "127.0.0.1", LocalAdr: "0.0.0.0", port: "3002", storage: "bus2" },
    { name: "srv_bus3", type: "business", ExternalAdr: "127.0.0.1", LocalAdr: "0.0.0.0", port: "3003", storage: "bus3" }
];
config.Storages = [
    { name: "sys", type: "system", host: 'localhost', database: 'possys', user: 'root', password: 'Nirvana!@#', connectionLimit: 10 },
    { name: "bus1", type: "business", host: 'localhost', database: 'posbus1', user: 'root', password: 'Nirvana!@#', connectionLimit: 10 },
    { name: "bus2", type: "business", host: 'localhost', database: 'posbus2', user: 'root', password: 'Nirvana!@#', connectionLimit: 10 },
    { name: "bus3", type: "business", host: 'localhost', database: 'posbus3', user: 'root', password: 'Nirvana!@#', connectionLimit: 10 },
    { name: "soc1", type: "social", host: 'localhost', database: 'possoc1', user: 'root', password: 'Nirvana!@#', connectionLimit: 10 },
    { name: "soc2", type: "social", host: 'localhost', database: 'possoc2', user: 'root', password: 'Nirvana!@#', connectionLimit: 10 },
    { name: "soc3", type: "social", host: 'localhost', database: 'possoc3', user: 'root', password: 'Nirvana!@#', connectionLimit: 10 },
];

config.RemoteRedis = {
    address: "localhost",
    port: 6379
};

config.Secret = 'LoveOfMyLife';

config.getServer = function (srvname) {

    var name = config.CurrentServer;
    if (srvname != null && config.isProductionMode == false)
        name = srvname;

    for (var i = 0; i < config.Servers.length; i++) {
        if (config.Servers[i].name == name)
            return config.Servers[i];
    }

    return null;

};


config.getStorage = function (srvname) {

    var server = config.getServer(srvname);

    for (var i = 0; i < config.Storages.length; i++) {
        if (config.Storages[i].name == server.storage)
            return config.Storages[i];
    }

    return null;
};

config.getMySQLConfig = function (srvname) {

    var storage = config.getStorage(srvname);
    if (storage != null)
        return {
            connectionLimit: storage.connectionLimit,
            host: storage.host,
            user: storage.user,
            password: storage.password,
            database: storage.database,
            multipleStatements: true
        };

    return null;
};

module.exports = config;
