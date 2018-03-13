
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "ARPromotion"
};

ex.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, ex);
    if (isHandled) return isHandled;

    var params = JSON.parse(request.params);
    if (request.method == "getByItem") return await ex.getByItem(params);

    return null;
};

ex.quickCreate = async function (bus, params) {

    if (!bus)
        return null;

    var id = UUID.newOnBus(bus.id, false);

    var obj = {};
    obj.id = UUID.SQLformat(id);
    obj.business = UUID.SQLformat(bus.id);
    if (params.branch) obj.branch = UUID.SQLformat(params.branch);
    if (params.branchno) obj.branchno = params.branchno;
    if (params.store) obj.store = UUID.SQLformat(params.store);
    if (params.storeno) obj.storeno = params.storeno;

    if (params.effected_start) obj.effected_start = params.effected_start;
    if (params.effected_end) obj.effected_end = params.effected_end;

    if (params.itemgroup) obj.itemgroup = UUID.SQLformat(params.itemgroup);
    if (params.itemgroupno) obj.itemgroupno = params.itemgroupno;

    if (params.item) obj.item = UUID.SQLformat(params.item);
    if (params.itemno) obj.itemno = params.itemno;
    if (params.itemdesc) obj.itemdesc = params.itemdesc;

    if (params.UOM) obj.UOM = params.UOM;
    if (params.otherinfo) obj.otherinfo = params.otherinfo;

    if (params.cus_minpoint) obj.cus_minpoint = params.cus_minpoint;
    if (params.cus_maxpoint) obj.cus_maxpoint = params.cus_maxpoint;
    if (params.cus_mintier) obj.cus_mintier = params.cus_mintier;
    if (params.cus_maxtier) obj.cus_maxtier = params.cus_maxtier;

    if (params.minqty) obj.minqty = params.minqty;
    if (params.maxqty) obj.maxqty = params.maxqty;

    obj.discpct = (params.discpct) ? params.discpct : 0;

    if (params.note) obj.note = params.note;

    if (params && (params.session) && (params.session.user))
        obj.user = UUID.SQLformat(params.session.user);

    if (params && (params.session) && (params.session.username))
        obj.username = UUID.SQLformat(params.session.username);

    obj.checksum = DAL.hash(obj, true);

    obj = await DAL.insert("ARPromotion", obj);
    if (obj.error) return obj;

    return await ex.getone({ id: id });
};

ex.create = async function (params) {

    var bus = null;
    if (params && (params.session) && (params.session.business))
        bus = await ex.Business.getone({ id: params.session.business });

    return await ex.quickCreate(bus, params);
};


ex.update = async function (params) {

    let obj = params;

    var sql = DAL.genUpdate().table("ARPromotion");

    if (obj.branch != null) sql = sql.set("branch", UUID.SQLformat(obj.branch));
    if (obj.branchno != null) sql = sql.set("branchno", obj.branchno);
    if (obj.store != null) sql = sql.set("store", UUID.SQLformat(obj.store));
    if (obj.storeno != null) sql = sql.set("storeno", obj.storeno);

    if (obj.effected_start != null) sql = sql.set("effected_start", obj.effected_start);
    if (obj.effected_end != null) sql = sql.set("effected_end", obj.effected_end);
    if (obj.status != null) sql = sql.set("status", obj.status);

    if (obj.itemgroup != null) sql = sql.set("itemgroup", UUID.SQLformat(obj.itemgroup));
    if (obj.itemgroupno != null) sql = sql.set("itemgroupno", obj.itemgroupno);
    if (obj.item != null) sql = sql.set("item", UUID.SQLformat(obj.item));
    if (obj.itemno != null) sql = sql.set("itemno", obj.itemno);
    if (obj.itemdesc != null) sql = sql.set("itemdesc", obj.itemdesc);
    if (obj.UOM != null) sql = sql.set("UOM", obj.UOM);
    if (obj.otherinfo != null) sql = sql.set("otherinfo", obj.otherinfo);

    if (obj.cus_minpoint != null) sql = sql.set("cus_minpoint", obj.cus_minpoint);
    if (obj.cus_maxpoint != null) sql = sql.set("cus_maxpoint", obj.cus_maxpoint);
    if (obj.cus_mintier != null) sql = sql.set("cus_mintier", obj.cus_mintier);
    if (obj.cus_maxtier != null) sql = sql.set("cus_maxtier", obj.cus_maxtier);

    if (obj.minqty != null) sql = sql.set("minqty", obj.minqty);
    if (obj.maxqty != null) sql = sql.set("maxqty", obj.maxqty);
    if (obj.discpct != null) sql = sql.set("discpct", obj.discpct);

    if (obj.note != null) sql = sql.set("note", obj.note);

    sql = sql.set("updated_at", "NOW()")
        .where("id = ?", UUID.SQLformat(obj.id))
        .toString();

    return await DAL.update(sql);
};

ex.delete = async function (params) {
    return ex.Base.delete("ARPromotion", params);
};

ex.deactive = async function (params) {
    return ex.Base.deactive("ARPromotion", params);
};

ex.active = async function (params) {
    return ex.Base.active("ARPromotion", params);
};

ex.getByItem = async function (params) {

    let item = await ex.Item.getone({ business: params.business, id: params.id });
    if (!item)
        return null;

    var sql = DAL.genSelect().from("ARPromotion")
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
        .field("UOM")
        .field("discpct");

    if (params && (params.session) && (params.session.business))
        sql = sql.where("business = ?", UUID.SQLformat(params.session.business));

    sql = sql.where("item = ? OR itemgroup = ?", UUID.SQLformat(item.id), UUID.SQLformat(item.group))
        .where("status = 1")
        .where("effected_start <= NOW() AND effected_end >= NOW()")

    if (params.branch) sql = sql.where("branch = ? OR branch IS NULL", UUID.SQLformat(params.branch));
    if (params.store) sql = sql.where("store = ? OR store IS NULL", UUID.SQLformat(params.store));

    let customer = await ex.Customer.getone({ business: params.business, id: params.customer });
    if (customer) {
        sql = sql.where("cus_minpoint IS NULL OR cus_minpoint <= ?", customer.point);
        sql = sql.where("cus_maxpoint IS NULL OR cus_maxpoint >= ?", customer.point);
        sql = sql.where("cus_mintier IS NULL OR cus_mintier >= ?", customer.tier);
        sql = sql.where("cus_maxtier IS NULL OR cus_maxtier >= ?", customer.tier);
    }

    sql = sql.where("UOM IS NULL OR UOM = ?", params.UOM);
    sql = sql.where("minqty IS NULL OR minqty <= ?", params.qty);
    sql = sql.where("maxqty IS NULL OR maxqty >= ?", params.qty);

    sql = sql.order("discpct");

    sql = sql.toString();

    return await DAL.selectFirst(sql);
};

ex.getone = async function (params) {

    var sql = DAL.genSelect().from("ARPromotion")
        .field("effected_start")
        .field("effected_end")
        .field("status")
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
        .field("otherinfo")
        .field("cus_minpoint")
        .field("cus_maxpoint")
        .field("cus_mintier")
        .field("cus_maxtier")
        .field("minqty")
        .field("maxqty")
        .field("discpct");

    if (params && (params.session) && (params.session.business))
        sql = sql.where("business = ?", UUID.SQLformat(params.session.business));

    sql = sql.where("id = ?", UUID.SQLformat(params.id));

    sql = sql.order("itemno")
        .order("branchno")
        .order("effected_start");

    sql = sql.toString();

    return await DAL.selectFirst(sql);
};


ex.getall = async function (params) {

    if (!params || !(params.session) || !(params.session.business))
        return null;

    var sql = DAL.genSelect().from("ARPromotion")
        .field("effected_start")
        .field("effected_end")
        .field("status")
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
        .field("otherinfo")
        .field("cus_minpoint")
        .field("cus_maxpoint")
        .field("cus_mintier")
        .field("cus_maxtier")
        .field("minqty")
        .field("maxqty")
        .field("discpct");

    sql = sql.where("business = ?", UUID.SQLformat(params.session.business));
    sql = sql.toString();

    return await DAL.select(sql);
};

