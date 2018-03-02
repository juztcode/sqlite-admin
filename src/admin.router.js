/**
 * if you are using express you can easily redirect admin end point here.
 * see sample server (server.js) for further information
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function (adminService) {
    const router = express.Router();

    router.use(bodyParser.json());

    /**
     * @description admin guard middleware
     */
    const adminGuard = function (req, res, next) {
        const token = req.get('Authorization');
        if (adminService.validate(token)) {
            next();
        } else {
            res.status(401);
            res.send();
        }
    }

    /**
     * @description get all table names
     */
    router.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, 'admin.html'));
    });

    /**
     * @description auth admin user
     */
    router.post('/auth', function (req, res) {
        const token = adminService.auth(req.body.password);

        if (token) {
            res.status(200);
            res.send({
                token: token
            });
        } else {
            res.status(401);
            res.send();
        }
    });

    /**
     * @description get all table names
     */
    router.get('/tables', adminGuard, function (req, res, next) {
        adminService.tables()
            .then(tables => {
                res.status(200);
                res.send({
                    data: tables
                });
            });
    });

    /**
     * @description get table meta data
     */
    router.get('/tables/:name', adminGuard, function (req, res, next) {
        adminService.meta(req.params.name)
            .then(columns => {
                res.status(200);
                res.send({
                    data: columns
                });
            });
    });

    /**
     * @description get table rows
     */
    router.get('/tables/:name/rows', adminGuard, function (req, res, next) {
        adminService.view(req.params.name, req.query)
            .then(rows => {
                res.status(200);
                res.send({
                    data: rows
                });
            });
    });

    /**
     * @description add table row
     */
    router.post('/tables/:name/rows', adminGuard, function (req, res, next) {
        adminService.add(req.params.name, req.body)
            .then(() => {
                res.status(200);
                res.send();
            });
    });

    /**
     * @description update table row
     */
    router.patch('/tables/:name/rows', adminGuard, function (req, res, next) {
        adminService.update(req.params.name, req.body, req.query)
            .then(() => {
                res.status(200);
                res.send();
            });
    });


    /**
     * @description remove table row
     */
    router.delete('/tables/:name/rows', adminGuard, function (req, res, next) {
        adminService.remove(req.params.name, req.body)
            .then(() => {
                res.status(200);
                res.send();
            });
    });

    return router;
}