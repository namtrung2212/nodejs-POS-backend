var mysql = require('mysql');
var fs = require('fs');
var prompt = require('prompt');
var colors = require("colors/safe");

var script = require("./script/ScriptHelper");

prompt.message = "";
prompt.start();

if (process.argv[2] == "-sys") {

    prompt.get([{
        name: 'anwser',
        description: colors.magenta('Do you want to recreate System Database ? <Y/N> '),
        type: 'string'
    }], function (err, result) {

        if (result.anwser == "Y" || result.anwser == "") {
            console.log("Creating System Database....");
            script.connectSysDB();
            script.recreateDB(function (error, results, fields) {

                if (error)
                    console.log("error: " + error);
                else
                    console.log("Done!");
                process.exit();
            });
        }
    });
}




if (process.argv[2] == "-bus") {

    prompt.get([{
        name: 'anwser',
        description: colors.magenta("Do you want to recreate Business Database " + process.argv[3] + " ? <Y/N> "),
        type: 'string'
    }], function (err, result) {

        if (result.anwser == "Y" || result.anwser == "") {

            console.log("Creating Business Database " + process.argv[3] + "....");
            script.connectBusDB(process.argv[3]);
            script.recreateDB(function (error, results, fields) {

                if (error)
                    console.log("error: " + error);
                else
                    console.log("Done!");
                process.exit();
            });
        }
    });

}
