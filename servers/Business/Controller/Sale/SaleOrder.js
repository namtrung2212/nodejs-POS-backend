
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var Redis = require("../../../../helpers/RedisHelper");
var grpc = require("../../../../grpc/grpcClient");

var public = module.exports = {};
var private = {
};

public.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, public);
    if (isHandled) return isHandled;

    return null;
};

public.quickCreate = async function (bus, params) {

    if (!bus)
        return null;

    var id = UUID.newOnBus(bus.id, false);

    var order = {};
    order.id = UUID.SQLformat(id);
    if (params.user) order.user = params.user;
    if (params.username) order.username = params.username;

    order.orderno = (await ex.Numbering.getNext(bus.id, "AROrder")).numbering;
    if (params.ref) order.ref = params.ref;
    if (params.reftype) order.reftype = params.reftype;

    order.business = UUID.SQLformat(bus.id);
    if (params.branch) order.branch = UUID.SQLformat(params.branch);
    if (params.branchno) order.branchno = params.branchno;
    if (params.store) order.store = UUID.SQLformat(params.store);
    if (params.storeno) order.storeno = params.storeno;
    if (params.storecell) order.storecell = params.storecell;
    if (params.warehouse) order.warehouse = UUID.SQLformat(params.warehouse);
    if (params.warehouseno) order.warehouseno = params.warehouseno;

    if (params.phonenum != null) {
        order.phonenum = params.phonenum;
        let customer = await ex.Customer.getone({ phonenum: params.phonenum });
        if (customer) {
            order.customer = customer.id;
            order.customerno = customer.customerno;
            order.customername = customer.name;
        }
    }
    if (params.customer) order.customer = params.customer;
    if (params.customerno) order.customerno = params.customerno;
    if (params.customername) order.customername = params.customername;

    if (params.shippable) order.shippable = params.shippable;
    if (params.partialship) order.partialship = params.partialship;
    if (params.shipinfo) order.shipinfo = params.shipinfo;
    if (params.invoiceinfo) order.invoiceinfo = params.invoiceinfo;

    if (params.note) order.note = params.note;

    order.checksum = ex.DAL.hash(order, true);

    let obj = await ex.DAL.insert("AROrder", order);
    if (bus.error)
        return bus;

    await ex.Numbering.increase(bus.id, "AROrder");
    return await public.getone({ id: id });
};

public.create = async function (params) {

    var bus = null;
    if (params && (params.session) && (params.session.business))
        bus = await ex.Business.getone({ id: params.session.business });

    return await public.quickCreate(bus, params);
};


public.update = async function (params) {

    let obj = params;

    var sql = ex.DAL.genUpdate().table("AROrder");

    if (obj.ref != null) sql = sql.set("ref", obj.ref);

    if (obj.reftype != null) sql = sql.set("reftype", obj.reftype);

    if (obj.storecell != null) sql = sql.set("storecell", obj.storecell);

    if (obj.warehouse != null) {
        let warehouse = await ex.Warehouse.getone({ id: obj.warehouse });
        if (warehouse)
            sql = sql.set("warehouse", obj.warehouse)
                .set("warehouseno", obj.warehouseno);
    }

    if (obj.phonenum != null) {
        sql = sql.set("phonenum", obj.phonenum);
        let customer = await ex.Customer.getone({ phonenum: obj.phonenum });
        if (customer) {
            sql = sql.set("customer", customer.id);
            sql = sql.set("customerno", customer.customerno);
            sql = sql.set("customername", customer.name);
        }
    }

    if (obj.customer != null) sql = sql.set("customer", UUID.SQLformat(obj.customer));
    if (obj.customerno != null) sql = sql.set("customerno", obj.customerno);
    if (obj.customername != null) sql = sql.set("customername", obj.customername);


    if (obj.shippable != null) sql = sql.set("shippable", obj.shippable);
    if (obj.partialship != null) sql = sql.set("partialship", obj.partialship);
    if (obj.shipinfo != null) sql = sql.set("shipinfo", obj.shipinfo);
    if (obj.invoiceinfo != null) sql = sql.set("invoiceinfo", obj.invoiceinfo);

    if (obj.note != null) sql = sql.set("note", obj.note);

    sql = sql.set("updated_at", "NOW()")
        .where("id = ?", UUID.SQLformat(obj.id))
        .toString();

    return await ex.DAL.update(sql);
};

public.delete = async function (params) {
    return ex.Base.delete("AROrder", params);
};

public.deactive = async function (params) {
    return ex.Base.deactive("AROrder", params);
};

public.active = async function (params) {
    return ex.Base.active("AROrder", params);
};

public.getone = async function (params) {

    let obj = params;

    var sql = ex.DAL.genSelect().from("AROrder")
        .field("hex(id)", "id")
        .field("created_at")

        .field("orderno")
        .field("released")
        .field("status")

        .field("hex(business)", "business")
        .field("storecell")

        .field("phonenum")
        .field("hex(customer)", "customer")
        .field("customerno")
        .field("customername")

        .field("qty")
        .field("VATamt")
        .field("amount")

        .field("invoiced_amt")
        .field("invoice_remain_amt");

    if (obj.mode == "detail") {

        sql = sql.field("updated_at")
            .field("docdate")
            .field("user")
            .field("username")

            .field("ref")
            .field("reftype")

            .field("hex(branch)", "branch")
            .field("branchno")
            .field("hex(store)", "store")
            .field("storeno")
            .field("hex(warehouse)", "warehouse")
            .field("warehouseno")

            .field("hex(ar_shipment)", "ar_shipment")
            .field("ar_shipmentno")
            .field("hex(ar_invoice)", "ar_invoice")
            .field("ar_invoiceno")
            .field("hex(ic_issue)", "ic_issue")
            .field("ic_issueno")
            .field("hex(ap_purchase)", "ap_purchase")
            .field("ap_purchaseno")

            .field("discamt")

            .field("shippable")
            .field("partialship")
            .field("shipinfo")
            .field("shipping")
            .field("shipped")
            .field("shipremain")

            .field("invoiceinfo")
            .field("invoicing")
            .field("invoicing_amt")
            .field("invoiced")
            .field("invoice_remain")

            .field("returned")
            .field("warrantied")
            .field("purchasing")
            .field("purchased")
            .field("purchase_remain")

            .field("note");
    }

    if (params && (params.session) && (params.session.business))
        sql = sql.where("business = ?", UUID.SQLformat(params.session.business));

    sql = sql.where("id = ?", UUID.SQLformat(obj.id)).toString();

    return await ex.DAL.selectFirst(sql);
};

public.getall = async function (params) {

    if (!params || !(params.session) || !(params.session.business))
        return null;

    var sql = ex.DAL.genSelect().from("AROrder")
        .field("hex(id)", "id")
        .field("created_at")

        .field("orderno")
        .field("released")
        .field("status")

        .field("hex(business)", "business")
        .field("storecell")

        .field("phonenum")
        .field("hex(customer)", "customer")
        .field("customerno")
        .field("customername")

        .field("qty")
        .field("VATamt")
        .field("amount")

        .field("invoiced_amt")
        .field("invoice_remain_amt");

    if (obj.mode == "detail") {

        sql = sql.field("updated_at")
            .field("docdate")
            .field("user")
            .field("username")

            .field("ref")
            .field("reftype")

            .field("hex(branch)", "branch")
            .field("branchno")
            .field("hex(store)", "store")
            .field("storeno")
            .field("hex(warehouse)", "warehouse")
            .field("warehouseno")

            .field("hex(ar_shipment)", "ar_shipment")
            .field("ar_shipmentno")
            .field("hex(ar_invoice)", "ar_invoice")
            .field("ar_invoiceno")
            .field("hex(ic_issue)", "ic_issue")
            .field("ic_issueno")
            .field("hex(ap_purchase)", "ap_purchase")
            .field("ap_purchaseno")

            .field("discamt")

            .field("shippable")
            .field("partialship")
            .field("shipinfo")
            .field("shipping")
            .field("shipped")
            .field("shipremain")

            .field("invoiceinfo")
            .field("invoicing")
            .field("invoicing_amt")
            .field("invoiced")
            .field("invoice_remain")

            .field("returned")
            .field("warrantied")
            .field("purchasing")
            .field("purchased")
            .field("purchase_remain")

            .field("note");
    }

    if (obj.createStart && obj.creatEnd)
        sql = sql.where("created_at >= ? AND created_at <=?", obj.createStart, obj.creatEnd);

    if (obj.user) sql = sql.where("user = ?", UUID.SQLformat(obj.user));
    if (obj.username) sql = sql.where("username = ?", obj.username);

    if (obj.released) sql = sql.where("released = ?", obj.released);
    if (obj.status) sql = sql.where("status = ?", obj.status);

    sql = sql.where("business = ?", UUID.SQLformat(params.session.business));
    if (obj.branch) sql = sql.where("branch = ?", UUID.SQLformat(params.branch));
    if (obj.branchno) sql = sql.where("branchno = ?", branchno);
    if (obj.store) sql = sql.where("store = ?", UUID.SQLformat(params.store));
    if (obj.storeno) sql = sql.where("storeno = ?", storeno);
    if (obj.storecell) sql = sql.where("storecell = ?", storecell);
    if (obj.warehouse) sql = sql.where("warehouse = ?", UUID.SQLformat(params.warehouse));
    if (obj.warehouseno) sql = sql.where("warehouseno = ?", warehouseno);

    if (obj.customer) sql = sql.where("customer = ?", UUID.SQLformat(params.customer));
    if (obj.phonenum) sql = sql.where("phonenum = ?", phonenum);
    if (obj.customerno) sql = sql.where("customerno = ?", customerno);
    if (obj.customername) sql = sql.where("customername = ?", customername);

    sql = sql.toString();

    return await ex.DAL.select(sql);
};

