/**
 * if you are using express you can easily redirect admin end point here.
 * see sample server (server.js) for further information
 */

const express = require('express');
const adminService = require('./admin.service');

const router = express.Router();

/**
 * @description get all table names
 */
router.get('/tables', function (req, res, next) {
    adminService.tables()
        .then(tables => {
            res.status(200);
            res.send({
                data: tables
            })
        });
});

/**
 * @description get table meta data
 */
router.get('/tables/:name', function (req, res, next) {
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
router.get('/tables/:name/rows', function (req, res, next) {
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
router.post('/tables/:name/rows', function (req, res, next) {
    adminService.add(req.params.name, req.body)
        .then(() => {
            res.status(200);
            res.send();
        });
});

/**
 * @description update table row
 */
router.patch('/tables/:name/rows', function (req, res, next) {
    adminService.update(req.params.name, req.body, req.query)
        .then(() => {
            res.status(200);
            res.send();
        });
});


/**
 * @description remove table row
 */
router.delete('/tables/:name/rows', function (req, res, next) {
    adminService.remove(req.params.name, req.query)
        .then(() => {
            res.status(200);
            res.send();
        });
});

module.exports = router;