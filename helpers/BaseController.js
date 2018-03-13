
var UUID = require("./UUIDHelper");

function Base(tablename, dbname) {
    this.tablename = tablename;
    this.dbname = dbname;
};

module.exports = Base;

Base.prototype.init = function (dal) {
    this.DAL = dal;
    this.Redis = dal.Redis;
    this.Query = dal.Query;
};

Base.prototype.handler = async function (request, caller) {

    var params = JSON.parse(request.params);

    if (request.method == "create" && "create" in caller) return await caller.create(params);
    if (request.method == "update" && "update" in caller) return await caller.update(params);
    if (request.method == "delete" && "delete" in caller) return await caller.delete(params);
    if (request.method == "deactive" && "deactive" in caller) return await caller.deactive(params);
    if (request.method == "active" && "active" in caller) return await caller.active(params);
    if (request.method == "getone" && "getone" in caller) return await caller.getone(params);
    if (request.method == "getall" && "getall" in caller) return await caller.getall(params);

    return null;
};

Base.prototype.initForCreation = async function (busId, params) {

    var obj = {};

    await this.setValue(obj, "id", UUID.newOnBus(busId, false));

    if (params && (params.session) && (params.session.user))
        await this.setFK(obj, "user", params.session.user, this.User);

    await this.setValue(obj, "config", params.config ? params.config : "{}");
    await this.setValue(obj, "metadata", params.metadata ? params.metadata : "{}");
    await this.setValue(obj, "note", params.note);

    if (await this.Query.isColumn(this.tablename, "no"))
        obj.no = (await this.Numbering.getNext(busId, this.tablename)).numbering;

    await this.setValue(obj, "name", params.name);
    await this.setValue(obj, "desc", params.desc);
    await this.setValue(obj, "type", params.type);

    await this.setValue(obj, "docdate", params.docdate);
    await this.setValue(obj, "ref", params.ref);
    await this.setValue(obj, "reftype", params.reftype);
    await this.setValue(obj, "status", params.status);
    await this.setValue(obj, "active", params.active);
    await this.setValue(obj, , "glperiod", params.glperiod);

    await this.setFK(obj, "business", busId, this.Business);

    return obj;
};

Base.prototype.setFK = async function (obj, fieldname, id, Controller) {

    if (id && (await this.Query.isColumn(this.tablename, fieldname)) && (await this.Query.isTable(Controller.tablename))) {

        obj[fieldname] = UUID.SQLformat(id);

        if (await this.Query.isColumn(this.tablename, "metadata")) {

            if (obj.metadata == null || obj.metadata == undefined)
                obj.metadata = "{}";

            obj.metadata[Controller.tablename] = "{}";

            let objFK = await Controller.getone({ id: id });
            if (objFK) {
                if (await this.Query.isColumn(Controller.tablename, "no")) obj.metadata[Controller.tablename].no = objFK.no;
                if (await this.Query.isColumn(Controller.tablename, "name")) obj.metadata[Controller.tablename].name = objFK.name;
                if (await this.Query.isColumn(Controller.tablename, "desc")) obj.metadata[Controller.tablename].desc = objFK.desc;
                if (await this.Query.isColumn(Controller.tablename, "code")) obj.metadata[Controller.tablename].code = objFK.code;
                if (await this.Query.isColumn(Controller.tablename, "type")) obj.metadata[Controller.tablename].type = objFK.type;
                return obj;
            }
        }
    }
    return obj;
}

Base.prototype.setValue = async function (obj, fieldname, value) {

    if (await this.Query.isColumn(this.tablename, fieldname) && (value != undefined)) {

        if (await this.Query.isBinaryColumn(this.tablename, fieldname))
            obj[fieldname] = UUID.SQLformat(value);
        else
            obj[fieldname] = value;

    }
    return obj;
}


Base.prototype.create = async function (obj) {

    await this.setValue(obj, "metadata", "{}");

    let newObj = await this.DAL.insert(this.tablename, obj);
    if (newObj.error) return newObj;

    this.Redis.del(null, this.tablename);

    if (await this.Query.isColumn(this.tablename, "no"))
        await this.Numbering.increase(bus.id, this.tablename);

    await this.updateCheckSum(newObj.id);

    return awaitthisex.getOneByID(newObj.id);
};

Base.prototype.update = async function (sql) {

    ex.Redis.del(null, this.tablename);
    var result = await this.DAL.update(sql.toString());

    if (result.error == null && sql.id) {
        await this.updateCheckSum(sql.id);
        return await this.getOneByID(sql.id);
    }

    return result;
};

Base.prototype.updateCheckSum = async function (id) {

    if ((await this.Query.isColumn(this.tablename, "checksum")) && id) {
        var sql = await this.Query.updateCheckSum(this.tablename, id);

        await this.DAL.update(sql.toString());
    }

    return null;
};

Base.prototype.delete = async function (params) {

    this.Redis.del(null, this.tablename);
    return await this.DAL.deleteByID(this.tablename, params.id);
};


Base.prototype.deactive = async function (params) {

    var sql = await this.Query.update(this.tablename);
    await sql.trySet("status", 0);
    await sql.whereValue("id", params.id);

    return await this.update(sql);
};

Base.prototype.active = async function (params) {

    var sql = await this.Query.update(this.tablename);
    await sql.trySet("status", 0);
    await sql.whereValue("id", params.id);

    return await this.update(sql);
};

Base.prototype.getOneByID = async function (id) {

    var sql = (await this.Query.getone(this.tablename, { id: id }));
    if (!sql) return null;

    return await this.getone(sql);
};

Base.prototype.getone = async function (sql) {

    let cached = await this.Redis.get(sql.toString(), sql.tablename);
    if (cached) return JSON.parse(cached.toString());

    var obj = await this.DAL.selectFirst(sql.toString());
    if (!obj) return null;

    if ("config" in obj)
        obj.config = JSON.parse(obj.config.toString());

    if ("metadata" in obj)
        obj.metadata = JSON.parse(obj.metadata.toString());

    return obj;
};



Base.prototype.getall = async function (sql, localSeconds, remoteSeconds) {

    let cached = await this.Redis.get(sql, sql.tablename);
    if (cached) return JSON.parse(cached.toString());

    let result = await this.DAL.select(sql.toString());
    if (result) this.Redis.set(sql, sql.tablename, JSON.stringify(result), localSeconds, remoteSeconds);

    return result;
};
