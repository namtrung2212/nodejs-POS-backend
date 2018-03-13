var REST = require(__dirname + "/../../../../../helpers/RESTHelper");

const express = require('express')
var public = module.exports = {};

public.initRouter = function (grpc) {

    let routeMap = [
        { method: "post", secure: true, route: "switchstore" }
    ];

    let callBusSrv = true;
    var router = REST.initRouter("User", grpc, callBusSrv, routeMap);

    REST.barrier(router, ["/user/login"]);

    router.route("/login").post(async function (req, res) {

        var params = req.body;
        var bus = await Business.getone({ code: params.buscode });
        if (!bus || !bus.id) {
            res.json({ error: "Sai mã kinh doanh !", result: null });
            return
        }

        let server = grpc.getBusServerByID(bus.id);
        if (server) REST.execute(req, res, server, "User", "login", params);

    });

    return router;
};
