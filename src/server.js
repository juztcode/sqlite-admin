/**
 * sample server using express.js
 * use this template to integrate sqlite admin to your website
 */

const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./admin/admin.router');

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