
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "ItemGroup",
    DBtype: "business"
};


ex.quickCreate = async function (bus, params) {

    if (!bus) return null;

    var obj = await ex.Base.initForCreation(bus.id, params);

    await ex.Base.setValue(obj, "stockable", params.stockable);
    await ex.Base.setValue(obj, "saleable", params.saleable);
    await ex.Base.setValue(obj, "purchasable", params.purchasable);
    await ex.Base.setValue(obj, "expensable", params.expensable);

    return await ex.Base.create(obj, ex.tablename);
};

ex.create = async function (params) {
    var bus = await ex.Business.getFromSession(params);
    return await ex.quickCreate(bus, params);
};


ex.update = async function (params) {

    var sql = await ex.Query.update(ex.tablename, params);

    await sql.trySet("stockable", params.stockable);
    await sql.trySet("saleable", params.saleable);
    await sql.trySet("purchasable", params.purchasable);
    await sql.trySet("expensable", params.expensable);

    return await ex.Base.update(sql);
};

ex.delete = async function (params) {
    return ex.Base.delete(params);
};

ex.deactive = async function (params) {
    return ex.Base.deactive(params);
};

ex.active = async function (params) {
    return ex.Base.active(params);
};

ex.getone = async function (params) {

    var sql = (await ex.Query.getone(ex.tablename, params));
    if (!sql) return null;

    return await ex.Base.getone(sql, 60 * 60);
};


ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    return await ex.Base.getall(sql, 60 * 60);
};


