# SQLite admin
sqlite admin for node.js application based on single html page

# How to use
1. install sqlite-admin
```bash
npm install @juztcode/sqlite-admin --save
```

2. import sqlite-admin package and initialize with configuration
```javascript
const sqliteAdmin = require('@juztcode/sqlite-admin')({
    database: '<give-path-to-database-file-relative-to-root>',
    secret: '<secret-key-use-when-encrypting-tokens>',
    adminPass: '<admin-password-use-when-logging>'
});
```

3. it is recommended to assign secret and adminPass to environmental variables and use them
```bash
export SECRET='<secret-key-use-when-encrypting-tokens>'
export ADMIN_PASS='<admin-password-use-when-logging>'
```

and then use those values when initializing
```javascript
const sqliteAdmin = require('@juztcode/sqlite-admin')({
    database: '<give-path-to-database-file-relative-to-root>',
    secret: process.env.SECRET,
    adminPass: process.env.ADMIN_PASS
});
```

4. create express application and route admin url to admin router
```javascript
const express = require('express');
const app = express();

// adminModule initialize code here

app.use('<admin-base-url eg: /admin>', sqliteAdmin.adminRouter);

app.listen(3000, () => {
    console.log('server started on http://localhost:3000');
})
```

5. start application and go to admin route you provided.

>Happy Conding :)