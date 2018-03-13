
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "Item",
    DBtype: "business"
};

ex.quickCreate = async function (bus, params) {

    if (!bus)
        return null;

    var obj = await ex.Base.initForCreation(ex.tablename, bus.id, params);

    await ex.Base.setFK(obj, ex.tablename, "branch", params.branch, ex.Branch);
    await ex.Base.setFK(obj, ex.tablename, "store", params.store, ex.Store);
    await ex.Base.setFK(obj, ex.tablename, "itemgroup", params.itemgroup, ex.ItemGroup);
    await ex.Base.setFK(obj, ex.tablename, "vendor", params.vendor, ex.Vendor);
    await ex.Base.setFK(obj, ex.tablename, "employee", params.employee, ex.Employee);

    await ex.Base.setValue(obj, ex.tablename, "code", params.code);

    await ex.Base.setValue(obj, ex.tablename, "stockable", params.stockable);
    await ex.Base.setValue(obj, ex.tablename, "saleable", params.saleable);
    await ex.Base.setValue(obj, ex.tablename, "purchasable", params.purchasable);
    await ex.Base.setValue(obj, ex.tablename, "expensable", params.expensable);

    await ex.Base.setValue(obj, ex.tablename, "baseprice", params.baseprice);
    await ex.Base.setValue(obj, ex.tablename, "unitcost", params.unitcost);

    return await ex.Base.create(obj, ex.tablename);
};

ex.create = async function (params) {
    var bus = await ex.Business.getFromSession(params);
    return await ex.quickCreate(bus, params);
};


ex.update = async function (params) {

    var sql = await ex.Query.update(params.tablename, params);

    await sql.setFK("branch", params.branch, ex.Branch);
    await sql.setFK("store", params.store, ex.Store);
    await sql.setFK("itemgroup", params.itemgroup, ex.ItemGroup);
    await sql.setFK("vendor", params.vendor, ex.Vendor);
    await sql.setFK("employee", params.employee, ex.Employee);

    await sql.trySet("code", params.code);

    await sql.trySet("stockable", params.stockable);
    await sql.trySet("saleable", params.saleable);
    await sql.trySet("purchasable", params.purchasable);
    await sql.trySet("expensable", params.expensable);

    await sql.trySet("baseprice", params.baseprice);
    await sql.trySet("unitcost", params.unitcost);

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

    var sql = "";

    if (params.isGetConfig) {

        sql = ex.DAL.genSelect()
            .from("Item", "item")
            .join(
            ex.DAL.genSelect().from('ex.ItemGroup').where("business = ?", UUID.SQLformat(params.session.business)),
            "group",
            'item.itemgroup = group.id'
            );

        sql = sql.where("item.business = ?", UUID.SQLformat(params.session.business));
        sql = sql.where("item.id = ?", UUID.SQLformat(params.id));
        sql = sql.where("item.status = 1");
        if (params.type) sql = sql.where("item.type = ?", UUID.SQLformat(params.type))
        if (params.itemgroup) sql = sql.where("item.itemgroup = ?", UUID.SQLformat(params.itemgroup))

        sql = sql.field("hex(item.id)", "id")

            .field("item.metadata", "metadata")
            .field("item.active", "active")

            .field("hex(item.business)", "business")
            .field("hex(item.branch)", "branch")
            .field("hex(item.store)", "store")
            .field("hex(item.itemgroup)", "itemgroup")
            .field("hex(item.vendor)", "vendor")
            .field("hex(item.employee)", "employee")

            .field("item.no", "no")
            .field("item.code", "code")
            .field("item.name", "name")
            .field("item.desc", "desc")

            .field("item.type", "type")
            .field("item.stockable", "stockable")
            .field("item.saleable", "saleable")
            .field("item.purchasable", "purchasable")
            .field("item.expensable", "expensable")

            .field("item.baseprice", "baseprice")
            .field("item.unitcost", "unitcost");

        if (params.isGetConfig)
            sql = sql.field("group.config", "config");

        sql = sql.toString();

    } else {

        sql = ex.DAL.genSelect().from("Item");

        sql = sql.field("hex(item.id)", "id")

            .field("item.metadata", "metadata")
            .field("item.active", "active")

            .field("hex(item.business)", "business")
            .field("hex(item.branch)", "branch")
            .field("hex(item.store)", "store")
            .field("hex(item.itemgroup)", "itemgroup")
            .field("hex(item.vendor)", "vendor")
            .field("hex(item.employee)", "employee")

            .field("item.no", "no")
            .field("item.code", "code")
            .field("item.name", "name")
            .field("item.desc", "desc")

            .field("item.type", "type")
            .field("item.stockable", "stockable")
            .field("item.saleable", "saleable")
            .field("item.purchasable", "purchasable")
            .field("item.expensable", "expensable")

            .field("item.baseprice", "baseprice")
            .field("item.unitcost", "unitcost");

        if (params.isGetConfig)
            sql = sql.field("group.config", "config");

        sql = sql.where("item.business = ?", UUID.SQLformat(params.session.business));
        sql = sql.where("id = ?", UUID.SQLformat(params.id))
            .where("status = 1")
            .toString();

    }

    return await ex.DAL.selectFirst(sql);
};

ex.getall = async function (params) {

    if (!params || !(params.session) || !(params.session.business))
        return null;

    var sql = "";

    if (params.isGetConfig) {

        sql = ex.DAL.genSelect()
            .from("Item", "item")
            .join(
            ex.DAL.genSelect().from('ex.ItemGroup').where("business = ?", UUID.SQLformat(params.session.business)),
            "group",
            'item.itemgroup = group.id'
            );

        sql = sql.where("item.business = ?", UUID.SQLformat(params.session.business));
        sql = sql.where("item.status = 1");
        if (params.type) sql = sql.where("item.type = ?", UUID.SQLformat(params.type))
        if (params.itemgroup) sql = sql.where("item.itemgroup = ?", UUID.SQLformat(params.itemgroup))

        sql = sql.field("hex(item.id)", "id")

            .field("item.metadata", "metadata")
            .field("item.active", "active")

            .field("hex(item.business)", "business")
            .field("hex(item.branch)", "branch")
            .field("hex(item.store)", "store")
            .field("hex(item.itemgroup)", "itemgroup")
            .field("hex(item.vendor)", "vendor")
            .field("hex(item.employee)", "employee")

            .field("item.no", "no")
            .field("item.code", "code")
            .field("item.name", "name")
            .field("item.desc", "desc")

            .field("item.type", "type")
            .field("item.stockable", "stockable")
            .field("item.saleable", "saleable")
            .field("item.purchasable", "purchasable")
            .field("item.expensable", "expensable")

            .field("item.baseprice", "baseprice")
            .field("item.unitcost", "unitcost");

        if (params.isGetConfig)
            sql = sql.field("group.config", "config");

        sql = sql.toString();

    } else {

        sql = sql.field("hex(item.id)", "id")

            .field("item.metadata", "metadata")
            .field("item.active", "active")

            .field("hex(item.business)", "business")
            .field("hex(item.branch)", "branch")
            .field("hex(item.store)", "store")
            .field("hex(item.itemgroup)", "itemgroup")
            .field("hex(item.vendor)", "vendor")
            .field("hex(item.employee)", "employee")

            .field("item.no", "no")
            .field("item.code", "code")
            .field("item.name", "name")
            .field("item.desc", "desc")

            .field("item.type", "type")
            .field("item.stockable", "stockable")
            .field("item.saleable", "saleable")
            .field("item.purchasable", "purchasable")
            .field("item.expensable", "expensable")

            .field("item.baseprice", "baseprice")
            .field("item.unitcost", "unitcost");

        if (params.isGetConfig)
            sql = sql.field("group.config", "config");

        sql = sql.where("active = 1");

        sql = sql.where("item.business = ?", UUID.SQLformat(params.session.business));

        if (params.type) sql = sql.where("type = ?", UUID.SQLformat(params.type))

        if (params.itemgroup) sql = sql.where("itemgroup = ?", UUID.SQLformat(params.itemgroup))

        sql = sql.toString();

    }
    return await ex.DAL.select(sql);
};

