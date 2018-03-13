
var UUID = require("../../../helpers/UUIDHelper");
var JWT = require("../../../helpers/JWTHelper");
var PhoneHelper = require("../../../helpers/PhoneHelper");
var grpc = require("../../../grpc/grpcClient");
var ShortUniqueId = require('short-unique-id');

var ex = module.exports = {
    tablename: "Business",
    DBtype: "system"
};


ex.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, ex);
    if (isHandled) return isHandled;

    var params = JSON.parse(request.params);
    if (request.method == "isCodeExisted") return await ex.isCodeExisted(params);
    if (request.method == "getFirstByOwner") return await ex.login(params);

    return null;
};

ex.initBusiness = function (code, params) {

    var bus = {};
    bus.id = UUID.newOnBus(null, true);
    bus.code = code;

    if (params.name) bus.name = params.name;

    if (params.type) bus.type = params.type;

    if (params.config) {
        bus.config = JSON.stringify(params.config);
    } else {

        if (bus.type == null || bus.type == "retail")
            bus.config = require("../../../database/json/retail_business");
        else if (bus.type == "fnb")
            bus.config = require("../../../database/json/fnb_business");

        bus.config = JSON.stringify(bus.config);
    }

    if (params.owner) bus.owner = UUID.SQLformat(params.owner);

    bus.checksum = ex.DAL.hash(bus, true);
    return bus;
};

ex.newCode = async function () {

    for (var i = 0; i < 100; i++) {

        var code = new ShortUniqueId().randomUUID(6).toUpperCase();
        let results = await ex.isCodeExisted({ code: code });
        if (!results.existed)
            return results.code;
    }
};

ex.isCodeExisted = async function (params) {

    var sql = ex.DAL.genSelect().from(ex.tablename).where("code = ?", params.code).toString();
    let results = await ex.DAL.select(sql);

    return { code: params.code, existed: results.error == undefined && results.length > 0 };

};

ex.create = async function (params) {

    var code = params.code;

    let isExisted = (await ex.isCodeExisted({ code: code })).existed;
    if (isExisted) {
        // code = await ex.newCode();
        return ex.DAL.newRes({ error: "Mã CODE đã tồn tại !" });
    }

    if (!code)
        return ex.DAL.newRes({ error: "Mã CODE đã không hợp lệ !" });

    var bus = ex.initBusiness(code, params);
    let obj = await ex.DAL.insert(ex.tablename, bus);

    if (obj.error)
        return obj;

    bus = await ex.getone({ id: UUID.fromSQLformat(bus.id) });

    let server = grpc.getBusServerByID(bus.id);
    if (server)
        grpc.execute(server, "Generator", "genOrganization", bus);

    return ex.DAL.newRes(bus);
};

ex.update = async function (params) {

    var sql = await ex.Query.update(ex.tablename, params);
    await sql.trySet("address", params.address);

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

    sql = sql.field("code")
        .field("hex(owner)", "owner");

    await sql.whereValue("code", params.code);
    await sql.whereValue("owner", params.owner);

    return await ex.Base.getone(sql, 60 * 60);
};

ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    sql = sql.field("code")
        .field("hex(owner)", "owner");

    await sql.whereValue("code", params.code);
    await sql.whereValue("owner", params.owner);

    return await ex.Base.getall(sql, 60 * 60);
};

