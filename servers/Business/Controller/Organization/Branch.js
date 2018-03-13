
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "Branch",
    DBtype: "business"
};


ex.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, ex);
    if (isHandled) return isHandled;

    return null;
};

ex.quickCreate = async function (bus, params) {

    if (!bus) return null;

    var obj = await ex.Base.initForCreation(ex.tablename, bus.id, params);

    await ex.Base.setValue(obj, ex.tablename, "address", params.address);

    return await ex.Base.create(obj, ex.tablename);
};

ex.create = async function (params) {
    var bus = await ex.Business.getFromSession(params);
    return await ex.quickCreate(bus, params);
};


ex.update = async function (params) {

    var sql = await ex.Query.update(ex.tablename, params);
    await sql.trySet("address", params.address);

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

ex.getone = async function (params) {

    var sql = (await ex.Query.getone(ex.tablename, params));
    if (!sql) return null;

    sql = sq.field("address");

    return await ex.Base.getone(sql, 60 * 60);
};

ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    sql = sq.field("address");

    return await ex.Base.getall(sql, 60 * 60);
};

