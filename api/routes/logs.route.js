/**
 * Define all the Logs APIs
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

router.get('/mylogs', VerifyToken, UserExists, function (req, res) {
    let order = req.query.order || 'DESC';
    let orderBy = req.query.orderBy || 'logs.id';
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
                    case 'task': where.push(`task LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'started_at': where.push(`started_at LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'ended_at': where.push(`ended_at LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'created_at': where.push(`created_at LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                }
            }
        }
    }

    if (where.length) {
        whereConditions = ' WHERE ' + where.join(' AND ');
    }

    mysql.query(`SELECT logs.*, 
    CASE WHEN status = 1 THEN 'Completed' 
         WHEN status = 2 THEN 'Hold' 
         WHEN status = 0 THEN 'In Progress' 
         WHEN status = 3 THEN 'In QA' 
         WHEN status = 4 THEN 'Cancelled' 
        ELSE '' 
    END AS statusTxt 
    FROM ${config.tbl_logs} AS logs ${whereConditions} ORDER BY ${orderBy} ${order} LIMIT ${page}, ${limit}`, function (error, results, fields) {
        if (error) throw error;

        //query to count total record for pagination
            mysql.query(`SELECT COUNT(*) as ct FROM ${config.tbl_logs} AS logs WHERE user_id=?`, req.user_id, function (error1, results1, fields1) {
            if (error1) throw error1;
            let total = 0;
            if (typeof results1[0] != undefined && typeof results1[0].ct != undefined) {
                total = results1[0].ct;
            }
            return res.send({ data: results, total: total });
        });
    });
});


router.post('/add', VerifyToken, UserExists, function (req, res) {
    let ended_at = null;
    
    if (req.body.ended_at && req.body.ended_at_time){
        ended_at = req.body.ended_at.year + '-' + req.body.ended_at.month + '-' + req.body.ended_at.day + ' ' + req.body.ended_at_time.hour + ':' + req.body.ended_at_time.minute + ':' + req.body.ended_at_time.second;
    }

    let userObj = {
        user_id: req.user_id,
        task: req.body.task,
        description: req.body.description,
        status: req.body.status,
        started_at: req.body.started_at.year + '-' + req.body.started_at.month + '-' + req.body.started_at.day + ' ' + req.body.started_at_time.hour + ':' + req.body.started_at_time.minute + ':' +req.body.started_at_time.second,
        ended_at: ended_at,
        created_at: new Date()
    };

    mysql.query(`INSERT INTO ${config.tbl_logs} SET ? `, userObj, function (error, result, fields) {
        if (error) {
            console.log('error');
            throw error;
        }

        return res.send({ error: false, data: {id: result.insertId }, message: 'Log has been added successfully.' });
    });

});

module.exports = router;