
var ex = {};
module.exports = ex;
console.log("Numbering");

var UUID = require("./UUIDHelper");
var JWT = require("./JWTHelper");
var format = require('string-format');

var private = {
};

ex.init = async function (dal) {

    ex.DAL = dal;
    ex.Redis = dal.Redis;
    ex.Query = dal.Query;
    return;
};

ex.tryCreateNumbering = async function (busId, pattern) {

    if (!ex.Query.isTable("Numbering")) return null;

    var sql = ex.DAL.genSelect().from("Numbering")
        .field("pattern")
        .field("current")
        .where("business = ?", UUID.SQLformat(busId))
        .toString();

    var obj = await ex.DAL.selectFirst(sql);
    if (obj) return obj;

    if (!pattern) pattern = {};

    var numbering = {
        business: UUID.SQLformat(busId),
        pattern: JSON.stringify(pattern),
        current: "{}"
    };

    return await ex.DAL.insert("Numbering", numbering);
};

ex.tryCreatePattern = async function (busId, tablename) {

    if (!ex.Query.isTable("Numbering")) return null;

    var sql = ex.DAL.genSelect().from("Numbering")
        .field(format("JSON_EXTRACT(pattern, '$.{0}')", tablename), "pattern")
        .where("business = ?", UUID.SQLformat(busId))
        .toString();

    var obj = await ex.DAL.selectFirst(sql);
    if (obj) return obj;

    sql = ex.DAL.genUpdate().table("Numbering")
        .set("pattern", format("JSON_SET(pattern,'$.{0}','{N}')", tablename))
        .where("business = ?", UUID.SQLformat(busId))
        .toString();


    return await ex.DAL.update("Numbering", sql);
};

ex.getNext = async function (busId, tablename) {

    return new Promise(async function (resolve) {

        let isBusy = await ex.Redis.get(busId + tablename, "increaseNumberingIndex");
        if (isBusy) {

            setTimeout(() => {
                resolve(ex.getNext(busId, tablename))
            }, 1000)

        } else {

            let result = await ex.getCurrent(busId, tablename);
            let current = result.current + 1;
            var pattern = result.pattern;

            if (current < 10)

                resolve({
                    pattern: pattern,
                    current: current,
                    numbering: pattern.replace("{N}", (("0" + current.toString()).slice(-2)))
                });

            else
                resolve({
                    pattern: pattern,
                    current: current,
                    numbering: pattern.replace("{N}", current.toString())
                });
        }
    });
};


ex.getCurrent = async function (busId, tablename) {

    return new Promise(async function (resolve) {

        var sql = ex.DAL.genSelect().from("Numbering")
            .field(format("JSON_EXTRACT(pattern, '$.{0}')", tablename), "pattern")
            .field(format("JSON_EXTRACT(current, '$.{0}')", tablename), "current")
            .where("business = ?", UUID.SQLformat(busId)).toString();

        var obj = await ex.DAL.selectFirst(sql);
        if (obj) {

            let current = obj["current"];
            var pattern = obj["pattern"];
            pattern = pattern != null ? pattern : "{N}";
            current = current != null ? current : 0;

            var numbering = pattern.replace("{N}", current.toString());
            if (parseInt(current) < 10)
                numbering = pattern.replace("{N}", (("0" + current.toString()).slice(-2)));

            resolve({
                pattern: pattern,
                current: current,
                numbering: numbering
            });

        } else {

            await ex.tryCreateNumbering(busId);
            await ex.tryCreatePattern(busId, tablename);

            setTimeout(() => {
                resolve(ex.getCurrent(busId, tablename))
            }, 1000)
        }
    });
};


ex.increase = async function (busId, tablename) {

    let isBusy = await ex.Redis.get(busId + tablename, "increaseNumberingIndex");
    if (isBusy)
        return ex.DAL.newRes({ error: "another increasing..." });

    ex.Redis.set(busId + tablename, "increaseNumberingIndex", true, 60, 60);


    var sql1 = ex.DAL.genSelect().from("Numbering")
        .field(format("JSON_EXTRACT(current, '$.{0}') + 1", tablename))
        .where("business = ?", UUID.SQLformat(busId))
        .toString();

    sql1 = format("SET @value = ({0}); ", sql1);

    var sql = ex.DAL.genUpdate().table("Numbering")
        .set("current", format("JSON_SET(current,'$.{0}',IF(@value IS NULL ,1,@value))", tablename))
        .where("business = ?", UUID.SQLformat(busId))
        .toString();
    sql = sql1 + sql;

    if ((await ex.DAL.update(sql)).result != null) {

        let currentIndex = await ex.getCurrent(busId, tablename);
        await ex.Redis.del(busId + tablename, "increaseNumberingIndex");
        return ex.DAL.newRes(currentIndex);
    }

    await ex.Redis.del(busId + tablename, "increaseNumberingIndex");
    return ex.DAL.newRes({ error: "Không tồn tại Numbering cho " + tablename });
};

