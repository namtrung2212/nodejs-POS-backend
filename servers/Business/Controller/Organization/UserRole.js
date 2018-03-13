
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "UserRole",
    DBtype: "business"
};

ex.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, ex);
    if (isHandled) return isHandled;

    return null;
};

ex.quickCreate = async function (bus, params) {

    if (!bus) return null;

    var config = require("../../../../database/json/" + params.configFile);
    config = JSON.stringify(config);

    var obj = await ex.Base.initForCreation(ex.tablename, bus.id, params);
    await ex.Base.setValue(obj, ex.tablename, "config", config);
    return await ex.Base.create(obj, ex.tablename);
};

ex.create = async function (params) {
    var bus = await ex.Business.getFromSession(params);
    return await ex.quickCreate(bus, params);
};


ex.update = async function (params) {
    var sql = await ex.Query.update(ex.tablename, params);
    return await ex.Base.update(sql);
};

ex.delete = async function (params) {
    return ex.Base.delete(ex.tablename, params);
};

ex.deactive = async function (params) {
    return ex.Base.deactive(ex.tablename, params);
};

ex.active = async function (params) {
    return ex.Base.active(ex.tablename, params);
};

ex.getone = async function (busId, roleName) {

    var sql = (await ex.Query.getone(ex.tablename, params));
    if (!sql) return null;

    await sql.whereValue("name", roleName);

    return await ex.Base.getone(sql, 60 * 60);
};


ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    return await ex.Base.getall(sql, 60 * 60);
};
