/**
 * sample server using express.js
 * use this template to integrate sqlite admin to your website
 */

const express = require('express');
const bodyParser = require('body-parser');

// if there are existing db object to access sqlite pass it otherwise pass null
const adminRouter = require('./admin/admin.router')(null);
// if there is already existing db object
// const db = new sqlite3.Database('db/boresy-db.sqlite');
// const adminRouter = require('./admin/admin.router')(db);

const app = express();
app.use(bodyParser.json());

/**
 * here /api/admin end point is redirected to adminRouter
 * routes related to admin defined inside adminRouter
 */
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
});