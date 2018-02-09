# SQLite admin
sqlite admin for node.js application based on single html page

# Requirements
sqlite admin uses express, sqlite3 and body-parser packages.   
1. express: this package based on express framework if you are using other please use functions inside admin.service and need to define routes.
2. body-parser: use body-parser json middleware to parse request json body
3. sqlite3: client library use to access sqlite database
4. jsonwebtoken: use to generate and verify auth token

# How to use
1. install required packages
```bash
npm install express body-parser sqlite3 jsonwebtoken --save
```
2. create express app and use body-parser
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
```
2. copy src/admin folder to your project
3. provide location to databse in admin.config (provice location relative to root folder - see example)
4. redirect admin base route to admin router
```javascript
const adminRouter = require('path to admin/admin.router');

//code here...

app.use('/admin', adminRouter);
```
5. set secret key and admin password (you can set them using environment keys or using configuration)
```bash
export SECRET="secret key"
export ADMIN_PASS="admin password"
```
6. start application
```javascript
app.listen(3000, () => {
    console.log('server started on http://localhost:3000');
})
```
5. click [here](http://localhost:3000/admin) or goto admin route to access admin  panel