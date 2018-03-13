
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "ARPriceList",
    DBtype: "business"
};


ex.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, ex);
    if (isHandled) return isHandled;

    var params = JSON.parse(request.params);
    if (request.method == "getByItem") return await ex.getByItem(params);

    return null;
};

ex.quickCreate = async function (bus, params) {

    if (!bus) return null;

    var obj = await ex.Base.initForCreation(ex.tablename, bus.id, params);

    await ex.Base.setValue(obj, ex.tablename, "effected_start", params);
    await ex.Base.setValue(obj, ex.tablename, "effected_end", params);

    await ex.Base.setFK(obj, ex.tablename, "itemgroup", params.itemgroup, ItemGroup);
    await ex.Base.setFK(obj, ex.tablename, "item", params.item, ex.Item);

    await ex.Base.setValue(obj, ex.tablename, "attr", params);
    await ex.Base.setValue(obj, ex.tablename, "UOM", params);

    obj.unitprice = (params.unitprice) ? params.unitprice : 0;
    obj.VATpct = (params.VATpct) ? params.VATpct : 0;
    obj.taxedprice = params.unitprice * (1 + params.VATpct);

    await ex.Base.setValue(obj, ex.tablename, "note", params);

    return await ex.Base.create(obj, ex.tablename);
};

ex.create = async function (params) {
    var bus = await ex.Business.getFromSession(params);
    return await ex.quickCreate(bus, params);
};


ex.update = async function (params) {

    let obj = params;

    var sql = await ex.Query.update(ex.tablename, params);

    await sql.setFK("branch", params.branch, Branch);
    await sql.setFK("store", params.store, Store);
    await sql.setFK("warehouse", params.warehouse, Warehouse);
    await sql.setFK("item", params.item, ex.Item);
    await sql.setFK("itemgroup", params.itemgroup, ItemGroup);
    await sql.setFK("customer", params.customer, ex.Customer);
    await sql.setFK("agent", params.agent, Agent);

    await sql.trySet("effected_start", params.effected_start);
    await sql.trySet("effected_end", params.effected_end);

    await sql.trySet("UOM", params.UOM);

    if (obj.unitprice != null) sql = sql.set("unitprice", obj.unitprice);
    if (obj.VATpct != null) sql = sql.set("VATpct", obj.VATpct);

    sql = sql.set("taxedprice = unitprice * (1+VATpct)");

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

ex.getByItem = async function (params) {

    if (!params || !(params.session) || !(params.session.business))
        return null;

    let item = await ex.Item.getone({ business: params.session.business, id: params.id });
    if (!item)
        return null;

    var sql = ex.DAL.genSelect().from("ARPriceList")
        .field("hex(id)", "id")
        .field("hex(business)", "business")
        .field("hex(branch)", "branch")
        .field("branchno")
        .field("hex(store)", "store")
        .field("storeno")
        .field("hex(itemgroup)", "itemgroup")
        .field("itemgroupno")
        .field("hex(item)", "item")
        .field("itemno")
        .field("itemdesc")
        .field("UOM")
        .field("unitprice")
        .field("VATpct")
        .field("taxedprice");

    sql = sql.where("business = ?", UUID.SQLformat(params.session.business));

    sql = sql.where("item = ? OR itemgroup = ?", UUID.SQLformat(item.id), UUID.SQLformat(item.group))
        .where("status = 1")
        .where("effected_start <= NOW() AND effected_end >= NOW()")

    if (params.branch) sql = sql.where("branch = ? OR branch IS NULL", UUID.SQLformat(params.branch));
    if (params.store) sql = sql.where("store = ? OR store IS NULL", UUID.SQLformat(params.store));

    sql = sql.where("UOM = ?", params.UOM);
    sql = sql.order("taxedprice");

    sql = sql.toString();
    return await ex.DAL.selectFirst(sql);
};

ex.getone = async function (params) {

    var sql = (await ex.Query.getone(ex.tablename, params));
    if (!sql) return null;

    sql = sql.field("effected_start")
        .field("effected_end")
        .field("UOM")
        .field("unitprice")
        .field("VATpct")
        .field("taxedprice");

    sql = sql.order("item")
        .order("branch")
        .order("effected_start");

    return await ex.Base.getone(sql, 60 * 60);
};


ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    sql = sql.field("effected_start")
        .field("effected_end")
        .field("UOM")
        .field("unitprice")
        .field("VATpct")
        .field("taxedprice");

    sql = sql.order("item")
        .order("branch")
        .order("effected_start");

    return await ex.Base.getall(sql, 60 * 60);
};
