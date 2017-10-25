
var crypto = require('crypto');
var Q = require('q');
const RedisServer = require('redis-server');
const RedisClient = require('redis');
var config = require("../config");
module.exports = exports;

var localClient;
var remoteClient;

exports.start = function (resetLocal) {

    if (localClient == null) {
        new RedisServer(6378).open(null);
        localClient = RedisClient.createClient(6378, "localhost");
        if (resetLocal)
            localClient.flushall();
    }

    if (remoteClient == null && config.RemoteRedis.address != null && config.RemoteRedis.address != "")
        remoteClient = RedisClient.createClient(config.RemoteRedis.port, config.RemoteRedis.address);
};


exports.set = function (key, data, localSeconds, remoteSeconds) {

    var hexKey = crypto.createHash('md5').update(JSON.stringify(key)).digest("hex");

    if (localClient != null && localSeconds != null && localSeconds > 0) {

        localClient.set(hexKey, data, "EX", localSeconds);
    }
    if (remoteClient != null && remoteSeconds != null && remoteSeconds > 0)
        remoteClient.set(hexKey, data, "EX", remoteSeconds);

};

exports.get = function (key, callback) {

    var deferred = Q.defer();
    
    var hexKey = crypto.createHash('md5').update(JSON.stringify(key)).digest("hex");

    if (localClient != null && localClient.get(hexKey)) {

        localClient.get(hexKey, function (err, reply) {
            deferred.resolve(reply);
        });

    } else if (remoteClient != null && remoteClient.get(hexKey)) {

        remoteClient.get(hexKey, function (err, reply) {
            deferred.resolve(reply);
        });

    }else{
        deferred.resolve(null);
    }


    return deferred.promise;
};
