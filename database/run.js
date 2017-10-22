var mysql = require('mysql');
var fs = require('fs');

var script = require("./script/ScriptHelper");

//script.connectSysDB();
script.connectBusDB(1);
script.recreateTable("SaleOrder", function (error, results, fields) {

    if (error)
        console.log("error: " + error);
    else
        console.log("Done!");
    process.exit();
    
});