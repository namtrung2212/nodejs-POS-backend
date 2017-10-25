var exports = module.exports = {};

var Account = require("../Helper/AccountHelper");
var grpcHelper = require("../../../grpc/grpcClientHelper");
var JWT = require("../../../helpers/JWTHelper");


exports.init = function (server, proto) {

    server.addService(proto.Authen.AuthenService.service, {

        sendotp: function (call, callback) {

            var params = JSON.parse(call.request.params);
            Account.sendotp(params.phonenum, callback)

        },
        checkotp: function (call, callback) {

            var params = JSON.parse(call.request.params);
            Account.checkotp(params.phonenum, params.otp, callback)

        },
        register: function (call, callback) {

            var data = JSON.parse(call.request.params);
            if (data.bearing == null || JWT.verifyToken(data.bearing) == false) {

                grpcHelper.response("Không có quyền truy cập", null, callback);

            } else {

                Account.register(data.user, callback)
            }

        },
        login: function (call, callback) {

            var user = JSON.parse(call.request.params);
            Account.login(user, callback)

        },
        getUsers: function (call, callback) {

            callback(null, { result: "trung", res_at: new Date().getTime() });

        }
    });
};
