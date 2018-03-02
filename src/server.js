/**
 * sample server using express.js
 * use this template to integrate sqlite admin to your website
 */

const express = require('express');
const bodyParser = require('body-parser');

// initialize adminModule by passing config options. 
// passing credentials as direct values is not recomended. use environmental variables instead
const adminModule = require('./admin/admin.module')({
    database: 'db/db.sqlite',
    secret: 'secret',
    adminPass: '1234'
});

// if you are planning to use environmental variables
// const adminModule = require('./admin/admin.module')({
//     database: 'db/db.sqlite',
//     secret: process.env.SECRET,
//     adminPass: process.env.ADMIN_PASS
// });

// if there is a existing db object and to use that instead of creating new connection you can pass that.
// const db = new sqlite3.Database('db/db.sqlite');
// const adminModule = require('./admin/admin.module')({
//     database: 'db/db.sqlite',
//     secret: 'secret',
//     adminPass: '1234'
// }, db);

const app = express();
app.use(bodyParser.json());

/**
 * here /api/admin end point is redirected to adminRouter
 * routes related to admin defined inside adminRouter
 */
app.use('/admin', adminModule.adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
});