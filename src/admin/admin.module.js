const sqlite3 = require('sqlite3').verbose();

module.exports = function (config, db) {
    let activeDb = db || new sqlite3.Database(config.database);
    const adminService = require('./admin.service')(config, activeDb);
    const adminRouter = require('./admin.router')(adminService);

    return {
        activeDb: activeDb,
        adminService: adminService,
        adminRouter: adminRouter
    }
}