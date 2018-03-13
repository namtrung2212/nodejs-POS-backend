var mysql = require('mysql');
var fs = require('fs');
var format = require('string-format');
var config = require("../config");
public = module.exports = {};

var dbname = "";
var scriptFolder = "";
var pool = null;

public.connect = function (_dbname, dbconfig) {

    dbname = _dbname;
    if (dbname == "possys")
        scriptFolder = "./script/system/";
    else
        scriptFolder = "./script/business/";

    if (pool)
        return pool;

    pool = mysql.createPool(dbconfig);
    return pool;
};


public.exit = function () {

    if (pool)
        pool.end();
};


public.connectSysDB = function () {

    return public.connect("possys", config.SystemDBConnection);
};

public.connectBusDB = function (num) {

    return public.connect("posbus" + num, config.BusinessDBConnection);
};

public.recreateDB = function (callback) {

    fs.readdir(scriptFolder, function (err, items) {

        var sql = format("DROP DATABASE IF EXISTS {0}; \n CREATE DATABASE {0} DEFAULT CHARACTER SET utf8;\n use {0}; \n", dbname).toString();
        for (var i = 0; i < items.length; i++)
            sql += fs.readFileSync(scriptFolder + items[i]).toString();

        pool.query(sql, callback);
    });

};

public.recreateTable = function (tablename, callback) {

    var sql = format("use {0}; DROP TABLE IF EXISTS {1};", dbname, tablename);
    sql += fs.readFileSync(scriptFolder + tablename + ".sql");

    pool.query(sql, callback);

};