/**
 * configuration related to sqlite admin
 * provide path to database related to the root directory
 */

module.exports = {
    database: 'db/boresy-db.sqlite',
    /**
     * application will first look environment variable SECRET and then configuration
     * for security use environment variable to store secret key
     */
    secret: 'secret',
    /**
     * application will first look environment variable ADMIN_PASS and then configuration
     * for security use environment variable to store admin password
     */
    adminPass: '1234'
}