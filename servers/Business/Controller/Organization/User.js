
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper")
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "User",
    DBtype: "business"
};


ex.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, ex);
    if (isHandled) return isHandled;

    var params = JSON.parse(request.params);
    if (request.method == "loginAsAdmin") return await ex.loginAsAdmin(params);
    if (request.method == "switchStore") return await ex.switchStore(params);

    return null;
};

ex.isUserExisted = async function (busId, username) {

    var sql = ex.Query.initSelect("User");
    await sql.whereFK("business", busId);
    await sql.whereValue("name", username);

    sql = sql.where("status = 1").toString();

    var user = await ex.DAL.selectFirst(sql);
    return (user != null);
};

ex.quickCreate = async function (bus, params) {

    if (!bus) return null;

    var obj = await ex.Base.initForCreation(ex.tablename, bus.id, params);

    await ex.Base.setFK(obj, ex.tablename, "default_branch", params.branch, ex.Branch);
    await ex.Base.setFK(obj, ex.tablename, "default_store", params.store, ex.Store);
    await ex.Base.setFK(obj, ex.tablename, "default_warehouse", params.warehouse, ex.Warehouse);

    await ex.Base.setValue(obj, ex.tablename, "name", params.name);
    await ex.Base.setValue(obj, ex.tablename, "password", params.password);
    await ex.Base.setValue(obj, ex.tablename, "roles", params.roles);
    await ex.Base.setValue(obj, ex.tablename, "linkacc", params.linkacc);

    return await ex.Base.create(obj, ex.tablename);
};

ex.create = async function (params) {
    var bus = await ex.Business.getFromSession(params);
    return await ex.quickCreate(bus, params);
};

ex.update = async function (params) {

    var sql = await ex.Query.update(ex.tablename, params);

    await sql.trySet("roles", params.roles);
    await sql.setFK("default_branch", params.branch, ex.Branch);
    await sql.setFK("default_store", params.store, ex.Store);
    await sql.setFK("default_warehouse", params.warehouse, ex.Warehouse);

    await sql.trySet("linkacc", params.linkacc);

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

    await sql.tryField("branch", "hex(default_branch)");
    await sql.tryField("store", "hex(default_store)");
    await sql.tryField("warehouse", "hex(default_warehouse)");

    sql = sql.field("roles");
    sql = sql.field("linkacc");

    return await ex.Base.getone(sql, 60 * 60);
};

ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    await sql.tryField("branch", "hex(default_branch)");
    await sql.tryField("store", "hex(default_store)");
    await sql.tryField("warehouse", "hex(default_warehouse)");

    sql = sql.field("roles");
    sql = sql.field("linkacc");

    return await ex.Base.getall(sql, 60 * 60);
};


ex.login = async function (params) {

    let bus = await ex.Business.getone({ code: params.buscode });
    if (!bus)
        return ex.DAL.newRes({ error: "Sai mã doanh nghiệp" });

    var sql = (await ex.Query.initSelect(ex.tablename));
    if (!sql) return null;

    sql = sql
        .field("hex(id)", "user")
        .field("name", "username")
        .field("roles")
        .field("hex(business)", "business")
        .field("hex(default_branch)", "branch")
        .field("hex(default_store)", "store")
        .field("hex(default_warehouse)", "warehouse");


    await sql.whereFK("business", bus.id);
    await sql.whereValue("name", params.username);
    await sql.whereValue("password", UUID.SQLformat(params.password));

    sql = sql.where("active = 1").toString();

    var obj = await ex.DAL.selectFirst(sql);
    if (obj) {

        obj.token = JWT.longtermToken(obj);
        return obj;

    } else {

        if (await ex.isUserExisted(bus.id, params.username))
            return ex.DAL.newRes({ error: "Sai mật khẩu !" });
        else
            return ex.DAL.newRes({ error: "Tài khoản không tồn tại" });
    }
};


ex.loginAsAdmin = async function (params) {

    let token = await JWT.decodeToken(params.token);
    if (!token)
        return ex.DAL.newRes({ error: "Không có quyền truy cập!" });

    let bus = await ex.Business.getone({ code: params.buscode });
    if (!bus)
        return ex.DAL.newRes({ error: "Sai mã doanh nghiệp" });

    let accId = null;
    if (token && token.data)
        accId = token.data.account || token.data.id;

    if (bus.owner != accId)
        return ex.DAL.newRes({ error: "Không phải chủ doanh nghiệp !" });

    var sql = (await ex.Query.initSelect(ex.tablename));
    if (!sql) return null;

    sql = sql
        .field("hex(id)", "user")
        .field("name", "username")
        .field("roles")
        .field("hex(business)", "business")
        .field("hex(default_branch)", "branch")
        .field("hex(default_store)", "store")
        .field("hex(default_warehouse)", "warehouse");

    await sql.whereFK("business", bus.id);
    await sql.whereValue("name", "admin");
    await sql.whereFK("linkacc", bus.owner);

    sql = sql.where("active = 1").toString();

    var obj = await ex.DAL.selectFirst(sql);
    if (!obj)
        return ex.DAL.newRes({ error: "Tài khoản không tồn tại" });

    obj.token = JWT.longtermToken({
        owner: bus.owner,
        ...obj
    });

    return obj;
};

ex.switchStore = async function (token, storeId) {

    let store = await ex.Store.getone({ id: storeId });
    if (!store)
        return ex.DAL.newRes({ error: "Cửa hàng không tồn tại" });

    let info = await JWT.decodeToken(token);
    info.store = storeId;
    return ex.DAL.newRes(JWT.longtermToken(info));

};
