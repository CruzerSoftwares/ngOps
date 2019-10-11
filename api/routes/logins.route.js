/**
 * Define all the Logins APIs
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
const express = require('express');
const router = express.Router();
const mysql = require('../config/mysql');
const config = require('../config/config');
const VerifyToken = require('../middlewares/VerifyToken');
const UserExists = require('../middlewares/UserExists');

router.get('/mylogins', VerifyToken, UserExists, function (req, res) {
    let order = req.query.order || 'DESC';
    let orderBy = req.query.orderBy || 'logins.id';
    let limit = req.query.pageSize || 20;
    let page = req.query.page || 0;
    page = page > 0 ? (page - 1) * limit : 0;
    let where = [];
    let whereConditions = '';

    where.push('user_id=' + req.user_id);

    if (req.query.search) {
        for (var key in req.query.search) {
            if (req.query.search.hasOwnProperty(key)) {
                switch (key) {
                    case 'status': where.push(`status='${decodeURIComponent(req.query.search[key])}'`); break;
                    case 'os': where.push(`os LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'browser': where.push(`browser LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'ip': where.push(`ip LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'device': where.push(`device LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'created_at': where.push(`created_at LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                }
            }
        }
    }

    if (where.length) {
        whereConditions = ' WHERE ' + where.join(' AND ');
    }

    mysql.query(`SELECT logins.*, 
    CASE WHEN status = 1 THEN 'Successful' 
         WHEN status = 0 THEN 'Failed' 
        ELSE '' 
    END AS statusTxt 
    FROM ${config.tbl_logins} AS logins ${whereConditions} ORDER BY ${orderBy} ${order} LIMIT ${page}, ${limit}`, function (error, results, fields) {
        if (error) throw error;

        //query to count total record for pagination
        mysql.query(`SELECT COUNT(*) as ct FROM ${config.tbl_logins} AS logins WHERE user_id=?`, req.user_id, function (error1, results1, fields1) {
            if (error1) throw error1;
            let total = 0;
            if (typeof results1[0] != undefined && typeof results1[0].ct != undefined) {
                total = results1[0].ct;
            }
            return res.send({ data: results, total: total });
        });
    });
});

module.exports = router;