var UUID = require('uuid-js');

function UUIDHelper() {
};

UUIDHelper.create = function (dbNum) {

    var newId = UUID.create(1).toString().split('-').join('');
    if (dbNum == null)
        dbNum = 0;

    var firstChars = ("0" + dbNum).slice(-2);
    newId = firstChars + newId;
    return newId.toString('hex');
};

UUIDHelper.createForSQL = function (dbNum) {
    
        return "unhex('" + UUIDHelper.create(dbNum) + "')"
};

UUIDHelper.isSystem = function (id) {

    var firstChars = id.toString().slice(0, 2);
    return (firstChars == "00");

};

UUIDHelper.getDBNum = function (id) {

    var firstChars = id.toString().slice(0, 2);
    return parseInt(firstChars);
};
module.exports = UUIDHelper;