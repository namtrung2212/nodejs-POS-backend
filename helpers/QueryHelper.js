
var ex = module.exports = {};

console.log("Query");

var UUID = require("./UUIDHelper");
var format = require('string-format');

var private = {

    setFK: async function (sql, fieldname, id, Controller) {

        if (await ex.isColumn(sql.tablename, fieldname) && id) {
            let objFK = await Controller.getone({ id: id });
            if (objFK) {
                sql = sql.set(fieldname.toLowerCase(), UUID.SQLformat(id));

                let jsonObj = {};
                if (await ex.isColumn(Controller.tablename, "no")) jsonObj.no = objFK.no;
                if (await ex.isColumn(Controller.tablename, "name")) jsonObj.name = objFK.name;
                if (await ex.isColumn(Controller.tablename, "desc")) jsonObj.desc = objFK.desc;
                if (await ex.isColumn(Controller.tablename, "code")) jsonObj.code = objFK.code;
                if (await ex.isColumn(Controller.tablename, "type")) jsonObj.type = objFK.type;

                let strSet = format("JSON_SET(metadata,'$.{0}',{1})", fieldname.toLowerCase(), JSON.stringify(jsonObj));

                sql = sql.set("metadata", strSet);
            }
        }
        return sql;
    },

    trySet: async function (sql, fieldname, value) {

        if (await ex.isColumn(sql.tablename, fieldname) && (value != undefined)) {

            if (await ex.isBinaryColumn(sql.tablename, fieldname))
                sql = sql.set(fieldname, UUID.SQLformat(value));
            else
                sql = sql.set(fieldname, value);

        }

        return sql;
    },

    tryField: async function (sql, field, formula, name) {

        if (await ex.isColumn(sql.tablename, field)) {
            if (name)
                sql = sql.field(formula ? formula : field, name);
            else {
                if (formula)
                    sql = sql.field(formula, field);
                else
                    sql = sql.field(field);
            }
        }

        return sql;
    },

    fields: async function (sql, fields) {

        for (var i = 0; i < fields.length; i++) {
            if (await ex.isColumn(sql.tablename, fields[i]))
                sql = sql.field(fields[i]);
        }

        return sql;
    },

    whereFK: async function (sql, fieldname, value) {
        if (await ex.isColumn(sql.tablename, fieldname) && (value != undefined))
            sql = sql.where(fieldname + " = ?", UUID.SQLformat(value));
        return sql;
    },

    whereValue: async function (sql, fieldname, value) {

        if (await ex.isBinaryColumn(sql.tablename, fieldname) && (value != undefined)) {

            sql = sql.where(fieldname + " = ?", UUID.SQLformat(value));
            if (fieldname == "id")
                sql.id = value;


        } else if (await ex.isColumn(sql.tablename, fieldname) && (value != undefined))
            sql = sql.where(fieldname + " = ?", value);

        return sql;
    },

    whereUser: async function (sql, params) {

        if (params && (params.session) && (params.session.user) && (await ex.isColumn(sql.tablename, "user")))
            sql.set("user", UUID.SQLformat(params.session.user));;

        return sql;
    },

    whereBus: async function (sql, params) {

        if (params && (params.session) && (params.session.business) && (await ex.isColumn(sql.tablename, "business")))
            sql = sql.where("business = ?", UUID.SQLformat(params.session.business));

        return sql;
    }
};

ex.init = async function (redis, dal) {

    ex.Redis = redis;
    ex.DAL = dal;
    ex.Query = dal.Query;
    return;
};

ex.initColumns = async function (dbname) {

    let sql = "SHOW TABLES";
    let tables = (await ex.DAL.select(sql));

    if (tables && tables.error == null) {
        for (var i = 0; i < tables.length; i++) {
            let table = tables[i][Object.keys(tables[i])[0]];

            let sql2 = "SHOW COLUMNS FROM " + table;
            let columns = (await ex.DAL.select(sql2));
            if (columns && columns.error == null)
                ex.Redis.set(table, "Columns", JSON.stringify(columns), 60 * 60 * 24 * 365)

        }
    }
};

ex.isTable = async function (table) {

    if (table == "Account" || table == "Business") return true;

    let columns = await ex.Redis.get(table, "Columns");
    if (columns)
        return true;

    return false;
};

ex.isColumn = async function (table, column) {

    var columns = await ex.Redis.get(table, "Columns");
    if (!columns)
        return false;

    columns = JSON.parse(columns);
    for (var i = 0; i < columns.length; i++) {

        if (columns[i]["Field"].toString() == column)
            return true;
    }

    return false;
};

ex.isBinaryColumn = async function (table, column) {

    var columns = await ex.Redis.get(table, "Columns");
    if (!columns)
        return false;

    columns = JSON.parse(columns);
    for (var i = 0; i < columns.length; i++) {

        if ((columns[i]["Field"].toString() == column)
            && ((columns[i]["Type"].toString() == "binary(17)") || (columns[i]["Type"].toString() == "binary(16)"))
        )
            return true;
    }

    return false;
};


ex.initUpdate = function (tablename) {

    var sql = ex.DAL.genUpdate().table(tablename);
    sql.tablename = tablename;

    sql.setFK = async function (fieldname, id, Controller) {
        return private.setFK(this, fieldname, id, Controller);
    };

    sql.trySet = function (fieldname, value) {
        return private.trySet(this, fieldname, value);
    };

    sql.whereFK = function (fieldname, value) {
        return private.whereFK(this, fieldname, value);
    };

    sql.whereValue = function (fieldname, value) {
        return private.whereValue(this, fieldname, value);
    };

    sql.whereBus = function (params) {
        return private.whereBus(this, params);
    };

    sql.whereUser = function (params) {
        return private.whereUser(this, params);
    };

    return sql;
};

ex.initSelect = function (tablename) {

    var sql = ex.DAL.genSelect().from(tablename);
    sql.tablename = tablename;

    sql.fields = function (fields) {
        return private.fields(this, fields);
    };

    sql.tryField = function (field, fomula, name) {
        return private.tryField(this, field, fomula, name);
    };

    sql.whereFK = function (fieldname, value) {
        return private.whereFK(this, fieldname, value);
    };

    sql.whereValue = function (fieldname, value) {
        return private.whereValue(this, fieldname, value);
    };

    sql.whereBus = function (params) {
        return private.whereBus(this, params);
    };

    sql.whereUser = function (params) {
        return private.whereUser(this, params);
    };

    return sql;
};

ex.update = async function (tablename, params) {

    var sql = ex.initUpdate(tablename);
    await sql.whereUser(params);
    await sql.whereValue("id", params.id);

    await sql.trySet("updated_at", "NOW()");
    await sql.trySet("note", params.note);
    await sql.trySet("config", params.config);

    await sql.trySet("name", params.name);
    await sql.trySet("desc", params.desc);
    await sql.trySet("type", params.type);

    await sql.trySet("docdate", params.docdate);
    await sql.trySet("ref", params.ref);
    await sql.trySet("reftype", params.reftype);
    await sql.trySet("status", params.status);
    await sql.trySet("active", params.active);
    await sql.trySet("glperiod", params.glperiod);
    //await sql.setFK("glvoucher", params.glvoucher, GLVoucher);

    await sql.setFK("branch", params.branch, ex.Branch);
    await sql.setFK("store", params.store, ex.Store);
    await sql.trySet("storecell", params.storecell);
    await sql.setFK("warehouse", params.warehouse, ex.Warehouse);
    await sql.setFK("item", params.item, ex.Item);
    await sql.setFK("itemgroup", params.itemgroup, ex.ItemGroup);

    await sql.setFK("employee", params.employee, ex.Employee);
    await sql.setFK("customer", params.customer, ex.Customer);
    await sql.setFK("vendor", params.vendor, ex.Vendor);
    await sql.setFK("agent", params.agent, ex.Agent);

    return sql;
}

ex.updateCheckSum = async function (tablename, id) {

    var sql = ex.initUpdate(tablename);
    await sql.whereFK("id", id);

    var arr = [];
    var columns = await ex.Redis.get(tablename, "Columns");
    if (columns) {

        columns = JSON.parse(columns);
        for (var i = 0; i < columns.length; i++) {
            if (columns[i]["Field"].toString() != "checksum"
                && columns[i]["Field"].toString() != "created_at"
                && columns[i]["Field"].toString() != "updated_at")
                arr.push(format("IF({0} IS NULL, '',{0})", columns[i]["Field"].toString()));
        }
    }

    sql = sql.set("checksum", format("unhex(MD5(concat({0})))", arr.join(",")));

    return sql;
}

ex.getone = async function (tablename, params) {

    //  if (!params || !(params.id)) return null;

    var sql = ex.initSelect(tablename);

    await sql.tryField("id", "hex(id)");
    await sql.tryField("created_at");
    await sql.tryField("updated_at");
    await sql.tryField("user", "hex(user)");

    if (params.isGetMetaData) await sql.tryField("metadata");
    if (params.isGetConfig) await sql.tryField("config");
    if (params.isGetNote) await sql.tryField("note");

    await sql.tryField("checksum", "hex(checksum)");

    await sql.tryField("no");
    await sql.tryField("name");
    await sql.tryField("desc");
    await sql.tryField("type");

    await sql.tryField("docdate");
    await sql.tryField("ref");
    await sql.tryField("reftype");
    await sql.tryField("status");
    await sql.tryField("active");
    await sql.tryField("glperiod");
    await sql.tryField("glvoucher", "hex(glvoucher)");

    await sql.tryField("business", "hex(business)");

    await sql.whereBus(params);
    await sql.whereFK("id", params.id);
    await sql.whereFK("branch", params.branch);
    await sql.whereFK("store", params.store);
    await sql.whereFK("warehouse", params.warehouse);
    await sql.whereFK("item", params.item);
    await sql.whereFK("itemgroup", params.itemgroup);

    await sql.whereFK("customer", params.customer);
    await sql.whereFK("vendor", params.vendor);
    await sql.whereFK("agent", params.agent);

    await sql.whereValue("no", params.no);
    await sql.whereValue("name", params.name);
    await sql.whereValue("status", params.status);
    await sql.whereValue("active", params.active);
    await sql.whereValue("user", params.user);
    await sql.whereValue("type", params.type);
    await sql.whereValue("phonenum", params.phonenum);

    await sql.whereFK("glvoucher", params.glvoucher);

    return sql;
};

ex.getall = async function (tablename, params) {

    if (!params || !(params.session) || !(params.session.business))
        return null;

    var sql = ex.initSelect(tablename);

    await sql.tryField("id", "hex(id)");
    await sql.tryField("created_at");
    await sql.tryField("updated_at");
    await sql.tryField("user", "hex(user)");

    if (params.isGetMetaData) await sql.tryField("metadata");
    if (params.isGetConfig) await sql.tryField("config");
    if (params.isGetNote) await sql.tryField("note");

    await sql.tryField("checksum", "hex(checksum)");

    await sql.tryField("no");
    await sql.tryField("name");
    await sql.tryField("desc");
    await sql.tryField("type");

    await sql.tryField("docdate");
    await sql.tryField("ref");
    await sql.tryField("reftype");
    await sql.tryField("status");
    await sql.tryField("active");
    await sql.tryField("glperiod");
    await sql.tryField("glvoucher", "hex(glvoucher)");

    await sql.tryField("business", "hex(business)");

    await sql.whereBus(params);
    await sql.whereFK("branch", params.branch);
    await sql.whereFK("store", params.store);
    await sql.whereFK("warehouse", params.warehouse);
    await sql.whereFK("item", params.item);
    await sql.whereFK("itemgroup", params.itemgroup);

    await sql.whereFK("customer", params.customer);
    await sql.whereFK("vendor", params.vendor);
    await sql.whereFK("agent", params.agent);

    await sql.whereValue("status", params.status);
    await sql.whereValue("active", params.active);
    await sql.whereValue("user", params.user);
    await sql.whereValue("type", params.type);

    await sql.whereFK("glvoucher", params.glvoucher);

    return sql;
};

console.log("Query-done");