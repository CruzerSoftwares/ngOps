/**
 * Define all the mysql connections
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
const mysqlObj = require('mysql');
const config = require('./config');
const util = require('util');
// connection configurations

function makeDb() {

    const mysql = mysqlObj.createConnection({
        host: config.db_host,
        user: config.db_user,
        port: config.db_port,
        password: config.db_password,
        database: config.database
    });
    // connect to database
    mysql.connect(); 
    
    return {
        query(sql, args) {
            return util.promisify(mysql.query)
                .call(mysql, sql, args);
        },
        close() {
            return util.promisify(mysql.end).call(mysql);
        }
    };
}

module.exports = makeDb;