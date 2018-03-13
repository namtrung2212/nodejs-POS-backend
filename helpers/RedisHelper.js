
var public = {};
module.exports = public;

console.log("Redis");

var crypto = require('crypto');
var Q = require('q');
const RedisServer = require('redis-server');
const RedisClient = require('redis');
var config = require("../config");

var localClient;
var remoteClient;

public.start = async function (resetLocal) {

    if (localClient == null) {
        var port = parseInt(Math.random() * (9000 - 6000) + 6000);
        new RedisServer(port).open(null);
        localClient = RedisClient.createClient(port, "localhost");
        if (resetLocal)
            localClient.flushall();
    }

    if (remoteClient == null && config.RemoteRedis.address != null && config.RemoteRedis.address != "")
        remoteClient = RedisClient.createClient(config.RemoteRedis.port, config.RemoteRedis.address);
};



public.test = function (table) {


    return "213";
};
public.set = function (key, category, data, localSeconds, remoteSeconds) {

    var hexKey = crypto.createHash('md5').update(JSON.stringify(key)).digest("hex");
    var newKey = category + hexKey;

    if (localClient != null && localSeconds != null && localSeconds > 0) {

        localClient.set(newKey, data, "EX", localSeconds);
    }
    if (remoteClient != null && remoteSeconds != null && remoteSeconds > 0)
        remoteClient.set(newKey, data, "EX", remoteSeconds);

};


public.del = function (key, category) {

    if (key) {

        var hexKey = crypto.createHash('md5').update(JSON.stringify(key)).digest("hex");
        var newKey = category + hexKey;

        if (localClient != null)
            localClient.del(newKey);

        if (remoteClient != null)
            remoteClient.del(newKey);

    } else {

        if (localClient != null) {
            localClient.keys(category, function (err, rows) {
                for (var i = 0; i < rows.length; i++)
                    localClient.del(rows[i]);
            });
        }

        if (remoteClient != null) {
            remoteClient.keys(category, function (err, rows) {
                for (var i = 0; i < rows.length; i++)
                    remoteClient.del(rows[i]);
            });
        }
    }
};

public.get = async function (key, category) {

    return new Promise(async function (resolve, reject) {

        try {

            var hexKey = crypto.createHash('md5').update(JSON.stringify(key)).digest("hex");
            var newKey = category + hexKey;

            if (localClient != null && localClient.get(newKey)) {

                localClient.get(newKey, function (err, reply) {
                    resolve(reply);
                });

            } else if (remoteClient != null && remoteClient.get(newKey)) {

                remoteClient.get(newKey, function (err, reply) {
                    resolve(reply);
                });

            } else {
                resolve(null);
            }

        } catch (error) {

            resolve(null);
        }
    });
};
