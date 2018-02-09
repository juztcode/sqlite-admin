const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const adminConfig = require('./admin.config');
const adminHelper = require('./admin.helper');

const db = new sqlite3.Database(adminConfig.database);

const auth = function (password) {
    const secret = process.env.SECRET || adminConfig.secret;
    const adminPass = process.env.ADMIN_PASS || adminConfig.adminPass;
    
    if (password === adminPass) {
        const token = jwt.sign({
            type: 'bearer',
            issuer: 'juztcode',
            audience: 'admins'
        }, secret, {
            expiresIn: 60 * 60
        });

        return token;
    } else {
        return null;
    }
}

const tables = function () {
    return new Promise(resolve => {
        db.all(`SELECT name FROM sqlite_master WHERE type='table'`, function (err, tables) {
            if (err) {
                reject(err);
            } else {
                resolve(tables);
            }
        });
    });
};

const meta = function (tableName) {
    return new Promise(resolve => {
        db.all(`pragma table_info(${tableName})`, function (err, columns) {
            resolve(columns);
        });
    });
};

const view = function (tableName, conditions) {
    const sql_part1 = `SELECT * FROM ${tableName}`;
    const sql_part2 = ' WHERE ';
    let sql_conditions = '';
    let sql_final;

    sql_final = sql_part1;
    if (Object.keys(conditions).length > 0) {
        sql_conditions = adminHelper.generateMapString(conditions);
        sql_final += sql_part2 + sql_conditions;
    }

    return new Promise(resolve => {
        db.all(sql_final, function (err, rows) {
            resolve(rows);
        });
    });
};

const add = function (tableName, data) {
    const sql_part1 = `INSERT INTO ${tableName} (`;
    const sql_part2 = ') VALUES (';
    const sql_part3 = ')';
    let sql_columns = '';
    let sql_values = '';
    let sql_final;

    sql_columns = adminHelper.generateConcatString(Object.keys(data));
    sql_values = adminHelper.generateConcatString(Object.values(data));
    sql_final = sql_part1 + sql_columns + sql_part2 + sql_values + sql_part3;

    return new Promise(resolve => {
        db.run(sql_final, function (err) {
            resolve();
        });
    });
};

const update = function (tableName, data, conditions) {
    const sql_part1 = `UPDATE ${tableName} SET `;
    const sql_part2 = ' WHERE ';
    let sql_values = '';
    let sql_conditions = '';
    let sql_final;

    sql_values = adminHelper.generateMapString(data);
    sql_final = sql_part1 + sql_values;
    if (Object.keys(conditions).length > 0) {
        sql_conditions = adminHelper.generateMapString(conditions);
        sql_final += sql_part2 + sql_conditions;
    }

    return new Promise(resolve => {
        db.run(sql_final, function (err) {
            resolve();
        });
    });
};

const remove = function (tableName, conditions) {
    const sql_part1 = `DELETE FROM ${tableName}`;
    const sql_part2 = ' WHERE ';
    let sql_conditions = '';
    let sql_final;

    sql_final = sql_part1;
    if (Object.keys(conditions).length > 0) {
        sql_conditions = adminHelper.generateMapString(conditions);
        sql_final += sql_part2 + sql_conditions;
    }

    return new Promise(resolve => {
        db.run(sql_final, function (err) {
            resolve();
        });
    });
}

module.exports = {
    auth: auth,
    tables: tables,
    meta: meta,
    view: view,
    add: add,
    update: update,
    remove: remove
}