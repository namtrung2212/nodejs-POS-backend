var UUID = require('uuid-js');
var config = require("../config")

function UUIDHelper() {
};

UUIDHelper.newOnBus = function (refId, sqlformat) {

    var firstChars;
    if (refId)
        firstChars = refId.substr(0, 2);
    else {

        firstChars = config.getRandStorage().slice(3);
        if (firstChars.length < 2)
            firstChars = ("0" + firstChars).slice(-2);
    }

    var newId = firstChars + UUID.create(1).toString().split('-').join('');
    if (sqlformat)
        return "unhex('" + newId.toString('hex') + "')";
    else
        return newId.toString('hex');
};

UUIDHelper.newOnSys = function (sqlformat) {

    var newId = "00" + UUID.create(1).toString().split('-').join('');
    if (sqlformat)
        return "unhex('" + newId.toString('hex') + "')";
    else
        return newId.toString('hex');
};

UUIDHelper.SQLformat = function (id) {
    if (id)
        return "unhex('" + id + "')";
    return null;
};

UUIDHelper.fromSQLformat = function (formatedId) {

    return formatedId.substr(7, 34);
};

UUIDHelper.isSystem = function (id) {

    var firstChars = id.toString().slice(0, 2);
    return (firstChars == "00");

};

UUIDHelper.getDBNum = function (id) {

    if (id) {
        var firstChars = id.toString().slice(0, 2);
        return parseInt(firstChars);
    }

    return null;
};
module.exports = UUIDHelper;