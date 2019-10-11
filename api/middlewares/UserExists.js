/**
 * Middleware to check if provided user exists in our database
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
const mysql = require('../config/mysql');
const config = require('../config/config');

function checkUserExists(req, res, next) {
    mysql.query(`SELECT 1 FROM  ${config.tbl_users} where status=1 AND id=?`, req.user_id, function (error, results, fields) {
        if (error) throw error;
        let user = results[0];
        if (user == null) {
            return res.status(500).send({ auth: false, message: 'User does not exists!' });
        }

        next();
    });
}

module.exports = checkUserExists;