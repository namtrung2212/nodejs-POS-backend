var mysql = require('mysql');
var fs = require('fs');
var format = require('string-format');
var config = require("../config");
module.exports = exports;

var dbname = "";
var scriptFolder = "";
var pool = null;

exports.connect = function(_dbname,dbconfig){

        dbname =_dbname;
        if(dbname == "possys")
            scriptFolder = "./script/system/";
        else
            scriptFolder = "./script/business/";

        if(pool)
            return pool;

        pool = mysql.createPool(dbconfig);
        return pool;
};


exports.exit = function(){

    if(pool)
        pool.end();
};

    
exports.connectSysDB = function(){

        return exports.connect( "possys",config.SystemDBConnection) ;
};

exports.connectBusDB = function(num){
     
        return exports.connect("posbus"+num,config.BusinessDBConnection) ;
};

exports.recreateDB  = function(callback){

    fs.readdir(scriptFolder, function(err, items) {

        var sql = format("DROP DATABASE IF EXISTS {0}; \n CREATE DATABASE {0} DEFAULT CHARACTER SET utf8;\n use {0}; \n",dbname).toString();
        for (var i=0; i<items.length; i++) 
            sql += fs.readFileSync(scriptFolder + items[i]).toString();
            
        pool.query(sql, callback);
    });

};

exports.recreateTable  = function(tablename,callback){

        var sql = format("use {0}; DROP TABLE IF EXISTS {1};",dbname,tablename);
        sql += fs.readFileSync(scriptFolder + tablename + ".sql");
            
        pool.query(sql,callback );

};