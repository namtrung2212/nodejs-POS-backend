
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "Agent",
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

    await ex.Base.setFK(obj, ex.tablename, "branch", params.branch, ex.Branch);
    await ex.Base.setFK(obj, ex.tablename, "store", params.store, ex.Store);
    await ex.Base.setFK(obj, ex.tablename, "warehouse", params.warehouse, ex.Warehouse);
    await ex.Base.setFK(obj, ex.tablename, "employee", params.employee, ex.Employee);

    await ex.Base.setValue(obj, ex.tablename, "address", params.address);
    await ex.Base.setValue(obj, ex.tablename, "phonenum", params.phonenum);
    await ex.Base.setValue(obj, ex.tablename, "email", params.email);

    await ex.Base.setValue(obj, ex.tablename, "agent_acc", params.agent_acc);
    await ex.Base.setValue(obj, ex.tablename, "agent_business", params.agent_business);

    return await ex.Base.create(obj, ex.tablename);
};



ex.create = async function (params) {
    var bus = await ex.Business.getFromSession(params);
    return await ex.quickCreate(bus, params);
};


ex.update = async function (params) {

    var sql = await ex.Query.update(ex.tablename, params);

    await sql.setFK("branch", params.branch, ex.Branch);
    await sql.setFK("store", params.store, ex.Store);
    await sql.setFK("warehouse", params.warehouse, ex.Warehouse);
    await sql.setFK("employee", params.employee, ex.Employee);

    await sql.trySet("address", params.address);
    await sql.trySet("phonenum", params.phonenum);
    await sql.trySet("email", params.email);

    await sql.trySet("agent_acc", params.agent_acc);
    await sql.trySet("agent_business", params.agent_business);

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

    await sql.tryField("branch", "hex(branch)");
    await sql.tryField("store", "hex(store)");
    await sql.tryField("warehouse", "hex(warehouse)");
    await sql.tryField("employee", "hex(employee)");

    sql = sql.field("address");
    sql = sql.field("phonenum");
    sql = sql.field("email");

    return await ex.Base.getone(sql, 60 * 60);
};

ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    await sql.tryField("branch", "hex(branch)");
    await sql.tryField("store", "hex(store)");
    await sql.tryField("warehouse", "hex(warehouse)");
    await sql.tryField("employee", "hex(employee)");

    sql = sql.field("address");
    sql = sql.field("phonenum");
    sql = sql.field("email");

    return await ex.Base.getall(sql, 60 * 60);
};

