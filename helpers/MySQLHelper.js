
var ex = {};

module.exports = ex;

console.log("DAL");

var mysql = require('mysql');
var squel = require("squel");
var crypto = require('crypto');
var Q = require('q');
var UUID = require("./UUIDHelper");

var private = {

}

ex.init = async function () {

    ex.pools = new Map();

    var Redis = require("./RedisHelper");
    await Redis.start(true);
    ex.Redis = Redis;

    var Query = require("./QueryHelper");
    await Query.init(ex.Redis, ex);
    ex.Query = Query;

    return;
};

ex.connect = async function (dbconfig) {

    return new Promise((resolve) => {

        var pool = ex.pools.get(dbconfig.database);
        if (pool) {
            resolve(pool);
            return;
        }

        pool = mysql.createPool(dbconfig);
        ex.pools.set(dbconfig.database, pool);

        setTimeout(() => {

            ex.Query.initColumns(dbconfig.database);
            resolve(pool);
            return;
        }, 4000)

    });
};


ex.exit = function (dbname) {

    var pool = ex.pools.get(dbname);
    if (pool)
        pool.end();
};



ex.select = async function (sql, category, dbname, expLocal, expRemote) {

    let data = await ex.Redis.get(sql, category);
    if (data)
        return data;

    return new Promise((resolve, reject) => {

        var pool = dbname != null ? ex.pools.get(dbname) : ex.pools.values().next().value;
        if (pool) {

            pool.getConnection(function (err, connection) {

                connection.query(sql, function (error, results, fields) {

                    connection.release();

                    if (error != null)
                        resolve({ error: error.toString(), errcode: "101" });
                    else {

                        if (results != null && results instanceof Array && results.length == 1)
                            results = JSON.parse(JSON.stringify(results[0]));
                        else
                            results = JSON.parse(JSON.stringify(results));

                        resolve(results);

                        ex.Redis.set(sql, category, JSON.stringify(results), expLocal, expRemote);
                    }

                });
            });

        } else {

            resolve({ error: "Can not connect to database", errcode: "100" });
        }

    });

};

ex.selectFirst = async function (sql, dbname, expLocal, expRemote) {

    let results = await ex.select(sql, dbname, expLocal, expRemote);

    if (results.error)
        return results;

    if (results != null) {
        if (results instanceof Array) {
            if (results.length > 0)
                return results[0];
        } else {
            return results;
        }
    }

    return null;
};

ex.run = function (sql, dbname) {

    return new Promise((resolve, reject) => {

        var pool = dbname != null ? ex.pools.get(dbname) : ex.pools.values().next().value;
        if (pool) {

            pool.getConnection(function (err, connection) {

                connection.query(sql, function (error, results, fields) {

                    if (error) {

                        return connection.rollback(function () {
                            connection.release();
                            resolve({ error: error.toString(), errcode: "101" });
                        });

                    } else {

                        connection.commit(function (err) {

                            if (err) {

                                return connection.rollback(function () {
                                    connection.release();
                                    resolve({ error: err.toString(), errcode: "101" });
                                });

                            } else {
                                connection.release();
                                resolve(results);
                            }
                        });
                    }
                });
            });

        } else {

            resolve({ error: "Can not connect to database", errcode: "100" });

        }
    })
};

ex.genInsert = function () {
    return squel.insert({
        stringFormatter: function (str) {
            if (str.substring(0, 5) == "unhex")
                return str;

            if (str.substring(0, 5) == "NOW()")
                return str;

            return "'" + str + "'";
        }
    })
};

ex.insert = async function (table, obj, dbname) {
    let sql = ex.genInsert().into(table).setFields({ ...obj }).toString();
    // console.log("sql - " + sql.toString());
    return await ex.run(sql, dbname);
};

ex.genUpdate = function () {
    return squel.update({
        stringFormatter: function (str) {
            if (str.substring(0, 5) == "unhex")
                return str;

            if (str.substring(0, 5) == "NOW()")
                return str;

            return "'" + str + "'";
        }
    })
};

ex.update = async function (sql, dbname) {

    let results = await ex.run(sql, dbname);
    if (results.error == undefined && results.affectedRows > 0)
        return ex.newRes({ status: "updated" });
    else
        return ex.newRes({ error: "Dữ liệu không tồn tại", errcode: "102" });
};

ex.genDelete = function () {
    return squel.delete({
        stringFormatter: function (str) {
            if (str.substring(0, 5) == "unhex")
                return str;

            if (str.substring(0, 5) == "NOW()")
                return str;

            return "'" + str + "'";
        }
    })
};

ex.delete = async function (sql, dbname) {

    let results = await ex.run(sql, dbname);
    if (results.error == undefined && results.affectedRows > 0)
        return ex.newRes({ status: "deleted" });
    else
        return ex.newRes({ error: "Dữ liệu không tồn tại", errcode: "102" });
};

ex.deleteByID = async function (table, id, dbname) {

    var sql = ex.genDelete().from(table)
        .where("id = ?", UUID.SQLformat(id))
        .toString();

    let results = await ex.run(sql, dbname);
    if (results.error == undefined && results.affectedRows > 0)
        return ex.newRes({ status: "deleted" });
    else
        return ex.newRes({ error: "Dữ liệu không tồn tại", errcode: "102" });
};

ex.genSelect = function () {
    return squel.select({
        stringFormatter: function (str) {
            if (str.substring(0, 5) == "unhex")
                return str;

            return "'" + str + "'";
        }
    })
};

ex.hash = function (data, sqlformat) {

    var value;
    if (typeof data == "string")
        value = crypto.createHash('md5').update(data).digest("hex").toUpperCase();
    else
        value = crypto.createHash('md5').update(JSON.stringify(data)).digest("hex").toUpperCase();

    if (sqlformat)
        return "unhex('" + value + "')";
    else
        return value;
};


ex.newRes = function (result) {

    if (result.error)
        return { error: result.error, data: null };

    return { error: null, data: result };
};

console.log("DAL-done");
