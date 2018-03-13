
var UUID = require("../../../helpers/UUIDHelper");
var JWT = require("../../../helpers/JWTHelper");
var PhoneHelper = require("../../../helpers/PhoneHelper");
var grpc = require("../../../grpc/grpcClient");
var Q = require('q');
var OTP = require('otp');

var ex = module.exports = {
    tablename: "Account",
    DBtype: "system"
};

ex.handler = async function (request) {

    let isHandled = await ex.Base.handler(request, ex);
    if (isHandled) return isHandled;

    var params = JSON.parse(request.params);

    if (request.method == "sendotp") return await ex.sendActivationOTP(params);
    if (request.method == "verifyotp") return await ex.verifyActivationOTP(params);
    if (request.method == "login") return await ex.login(params);
    if (request.method == "logout") return await ex.logout(params);
    if (request.method == "sendforgotpasswordotp") return await ex.sendForgotPasswordOTP(params);
    if (request.method == "verifyforgotpasswordotp") return await ex.verifyForgotPasswordOTP(params);
    if (request.method == "changepassword") return await ex.changePassword(params);

    return null;
};

ex.isAccountExisted = async function (phonenum) {

    var sql = ex.DAL.genSelect().from(ex.tablename)
        .field("COUNT(*)", "count")
        .where("phonenum = ?", phonenum).toString();

    var accNum = await ex.DAL.select(sql);
    return (accNum != null && accNum.count > 0);
};


ex.sendActivationOTP = async function (params) {

    let phonenum = params.phonenum;

    if (await ex.isAccountExisted(phonenum))
        return ex.DAL.newRes({ error: "Số điện thoại đã tồn tại" });

    var otp = OTP({ secret: "activationOTP" }).totp();
    ex.Redis.set(phonenum, "activationOTP", otp, 60 * 5, 0);
    PhoneHelper.sendSMS(phonenum, otp);

    return ex.DAL.newRes({ sent: true, phonenum: phonenum, otp: otp });
};


ex.verifyActivationOTP = async function (params) {

    let phonenum = params.phonenum;
    let otp = params.otp;

    let data = await ex.Redis.get(phonenum, "activationOTP");

    var obj = (data == otp) ?
        { verified: true, phonenum: phonenum, register_token: JWT.shorttermToken({ phonenum: phonenum }) } :
        { verified: false, phonenum: phonenum };

    return ex.DAL.newRes(obj);
};


ex.create = async function (params) {

    if (await ex.isAccountExisted(params.phonenum))
        return ex.DAL.newRes({ error: "Số điện thoại đã tồn tại" });

    let id = UUID.newOnSys(false);

    let acc = {};
    acc.id = UUID.SQLformat(id);
    acc.name = params.name;
    acc.email = params.email;
    acc.phonenum = params.phonenum;
    acc.password = UUID.SQLformat(params.password);

    await ex.DAL.insert(ex.tablename, acc);

    await ex.Base.updateCheckSum(ex.tablename, id);

    return await ex.login({
        phonenum: params.phonenum,
        password: params.password
    });
};

ex.update = async function (params) {

    var sql = await ex.Query.update(ex.tablename, params);

    await sql.trySet("password", UUID.SQLformat(params.password));
    await sql.trySet("email", params.email);

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

    sql = sql.field("phonenum");
    sql = sql.field("email");

    await sql.whereValue("phonenum", params.phonenum);
    await sql.whereValue("password", params.password);

    return await ex.Base.getone(sql, 60 * 60);
};

ex.getall = async function (params) {

    var sql = (await ex.Query.getall(ex.tablename, params));
    if (!sql) return null;

    sql = sql.field("phonenum");
    sql = sql.field("email");

    return await ex.Base.getall(sql, 60 * 60);
};


ex.login = async function (params) {

    var acc = await ex.getone({ phonenum: params.phonenum, password: params.password });

    if (!acc) {

        if (await ex.isAccountExisted(params.phonenum))
            return ex.DAL.newRes({ error: "Sai mật khẩu !" });
        else
            return ex.DAL.newRes({ error: "Số điện thoại không tồn tại" });
    }

    let token = JWT.longtermToken(acc);

    let obj = await ex.loginDefaultBusiness(token, acc.id);

    if (obj) {
        obj.account = acc.account;
        obj.token = undefined;
        obj.token = JWT.longtermToken(obj);
        return obj;
    };

    acc.token = token;
    return acc;
};

ex.loginDefaultBusiness = async function (token, owner) {

    return await new Promise(async function (resolver, reject) {

        let bus = await ex.Business.getone({ owner: owner });
        if (!bus) {
            resolver(null);
            return;
        }

        let server = grpc.getBusServerByID(bus.id);
        if (server)
            grpc.execute(server, "User", "loginAsAdmin", { token: token, buscode: bus.code }, function (error, result) {

                if (result != null && result.result != null && result.result != undefined) {
                    result.result = JSON.parse(result.result);
                    resolver(result.result);
                }
                else
                    resolver(null);

            });
    });

};

ex.sendForgotPasswordOTP = async function (params) {

    let phonenum = params.phonenum;

    if (await ex.isAccountExisted(phonenum) == false)
        return ex.DAL.newRes({ error: "Số điện thoại không tồn tại" });

    var otp = OTP({ secret: "forgotpasswordOTP" }).totp();
    ex.Redis.set(phonenum, "forgotpasswordOTP", otp, 60 * 5, 0);
    PhoneHelper.sendSMS(phonenum, otp);

    return ex.DAL.newRes({ sent: true, phonenum: phonenum, otp: otp });

};

ex.verifyForgotPasswordOTP = async function (params) {

    let phonenum = params.phonenum;

    var acc = await ex.getone({ phonenum: phonenum });
    if (!acc || acc.error)
        return ex.DAL.newRes({ error: "Không tồn tại tài khoản" });

    let otp = params.otp;
    let data = await ex.Redis.get(phonenum, "forgotpasswordOTP");

    var obj = (data == otp) ?
        { verified: true, phonenum: phonenum, register_token: JWT.shorttermToken() } :
        { verified: false, phonenum: phonenum };

    obj.id = acc.id;
    return ex.DAL.newRes(obj);
};

ex.changePassword = async function (params) {
    var obj = { id: params.id, phonenum: params.phonenum, password: params.password };
    return await ex.update(obj);
};

