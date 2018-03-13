
var public = {};
module.exports = public;

console.log("REST");

const express = require('express')
var JWT = require("../helpers/JWTHelper");
var config = require("../config");

var private = {

};


public.barrier = function (router, routeMap, custom) {

    router.use(async function (req, res, next) {

        if (custom)
            return (await custom(req, res, next));

        if (routeMap) {
            for (var i = 0; i < routeMap.length; i++) {

                if (routeMap[i].secure == false && req.originalUrl.indexOf(routeMap[i].route) > -1) {
                    next();
                    return false;
                }
            }
        }

        if (!await public.verifyBarrier(req, res)) return;

        next()
    });

};
public.response = function (res, result) {

    if (result != null && result.result != null && result.result != "")
        result.result = JSON.parse(result.result);

    res.json(result);
};


public.verifyBarrier = async function (req, res) {

    if (!config.isUseBarrier)
        return true;

    var isOK = (req.headers.barrier != null) && await JWT.verifyToken(req.headers.barrier);
    if (!isOK)
        public.response(res, "Không có quyền truy cập");

    return isOK;
};


public.initRouter = function (entity, grpc, callBusSrv, routeMap, customBarrier) {

    var router = express.Router();
    public.barrier(router, routeMap, customBarrier);

    let map = [
        { method: "post", secure: true, route: "create" },
        { method: "post", secure: true, route: "update" },
        { method: "get", secure: true, route: "delete" },
        { method: "get", secure: true, route: "deactive" },
        { method: "get", secure: true, route: "active" },
        { method: "get", secure: true, route: "getone" },
        { method: "get", secure: true, route: "getall" }
    ];

    if (routeMap) map = map.concat(routeMap);

    for (var i = 0; i < map.length; i++) {
        let obj = map[i];

        if (obj.method == "get") {

            router.route("/" + obj.route).get(async function (req, res) {
                let server = callBusSrv ? (await grpc.getBusServer(req)) : grpc.system;

                if (!server)
                    res.json({ error: "Không xác định được server xử lý!", result: null });
                else
                    public.execute(server, entity, obj.route, req.query, req, res);
            });

        } else if (obj.method == "post") {

            router.route("/" + obj.route).post(async function (req, res) {
                let server = callBusSrv ? (await grpc.getBusServer(req)) : grpc.system; if (!server)
                    res.json({ error: "Không xác định được server xử lý!", result: null });
                else
                    public.execute(server, entity, obj.route, req.body, req, res);
            });

        }
    }


    return router;
};


public.genParams = async function (entity, method, params, req) {

    params.token = undefined;
    params.session = await public.getTokenData(req);

    var params = { entity: entity, method: method, params: JSON.stringify(params), req_at: new Date().getTime() };

    return params;

};

public.execute = async function (server, entity, route, params, req, res) {

    var execParams = (await public.genParams(entity, route, params, req));
    server.GRPCService.execute(execParams, function (error, result) {

        public.response(res, result);

    });
};

public.getBusIDFromToken = async function (req) {

    let info = await JWT.decodeToken(req.headers.barrier);
    return info && info.data ? info.data.business : null;
};

public.getTokenData = async function (req) {

    let info = await JWT.decodeToken(req.headers.barrier);
    return info && info.data ? info.data : null;
};

console.log("REST-done");