var mysql = require('mysql');
var squel = require("squel");
var crypto = require('crypto');
var Redis = require("./RedisHelper");
module.exports = exports;

var pools = new Map();

exports.connect = function (name, dbconfig) {

    Redis.start(true);

    var pool = pools.get(name);
    if (pool)
        return pool;

    pool = mysql.createPool(dbconfig);
    pools.set(name, pool);
    return pool;
};


exports.exit = function (name) {

    var pool = pools.get(name);
    if (pool)
        pool.end();
};


exports.select = function (name, sql, expLocal, expRemote, callback) {

    var data = Redis.get(name + sql);
    if (data)
        callback(null, data, null);

    else {
        var pool = pools.get(name);
        if (pool) {

            pool.query(sql, function (error, results, fields) {

                callback(error, results, fields);
                Redis.set(name + sql, JSON.stringify(results), expLocal, expRemote);

            });

        } else {

            callback("Can not connect to database");
        }
    }

};

exports.run = function (name, sql, callback) {

    var pool = pools.get(name);
    if (pool) {

        pool.query(sql, callback);

    } else {

        callback("Can not connect to database");

    }

};


exports.genInsert = function () {
    return squel.insert({
        stringFormatter: function (str) {
            if (str.substring(0, 5) == "unhex")
                return str;

            return "'" + str + "'";
        }
    })
};

exports.genUpdate = function () {
    return squel.update({
        stringFormatter: function (str) {
            if (str.substring(0, 5) == "unhex")
                return str;

            return "'" + str + "'";
        }
    })
};

exports.genSelect = function () {
    return squel.select({
        stringFormatter: function (str) {
            if (str.substring(0, 5) == "unhex")
                return str;

            return "'" + str + "'";
        }
    })
};
exports.hash = function (data) {
    return "unhex('" + crypto.createHash('md5').update(JSON.stringify(data)).digest("hex") + "')";
};