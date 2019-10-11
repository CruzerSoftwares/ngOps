/**
 * Define all the Attendance APIs
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
const makeDb = require('../config/makeDb');
const config = require('../config/config');
const VerifyToken = require('../middlewares/VerifyToken');
const UserExists = require('../middlewares/UserExists');
const db = makeDb();

async function getUsersCount(){
    try {
        const countQuery = await db.query(`SELECT COUNT(id) AS ct FROM ${config.tbl_users} WHERE status=1 LIMIT 1`);

        return countQuery[0]['ct'];
    } catch (err) {
        throw err;
    } finally {
        // await db.close();
    }
}

async function getPresentUsersCount(){
    try {
        const countQuery = await db.query(`SELECT COUNT(id) AS ct FROM ${config.tbl_attendances} WHERE DATE(punch_in) = CURDATE() LIMIT 1`);

        return countQuery[0]['ct'];
    } catch (err) {
        throw err;
    } finally {
        // await db.close();
    }
}

router.get('/', VerifyToken, UserExists, function (req, res) {
    let order = req.query.order || 'DESC';
    let orderBy = req.query.orderBy || 'attendances.id';
    let limit = req.query.pageSize || 20;
    let page = req.query.page || 0;
    page = page > 0 ? (page - 1) * limit : 0;
    let where = [];
    let whereConditions = '';
    
    if (req.query.search) {
        for (var key in req.query.search) {
            if (req.query.search.hasOwnProperty(key)) {
                switch (key) {
                    case 'user_id': where.push(`CONCAT(user.first_name, ' ', user.last_name) LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'status': where.push(`attendances.status='${decodeURIComponent(req.query.search[key])}'`); break;
                    case 'punch_in': where.push(`attendances.punch_in LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'punch_out': where.push(`attendances.punch_out LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'created_at': where.push(`attendances.created_at LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                }
            }
        }
    }

    if (where.length) {
        whereConditions = ' WHERE ' + where.join(' AND ');
    }

    mysql.query(`SELECT attendances.*, 
    CASE WHEN attendances.status = 1 THEN 'Full Day' 
         WHEN attendances.status = 2 THEN 'Half Day' 
         WHEN attendances.status = 0 THEN 'Pending' 
         WHEN attendances.status = 3 THEN 'Short Leave' 
         WHEN attendances.status = 4 THEN 'OT' 
         WHEN attendances.status = 5 THEN 'Partial' 
        ELSE '' 
    END AS statusTxt,
    CONCAT(user.first_name, ' ', user.last_name) AS name
    FROM ${config.tbl_attendances} AS attendances 
    LEFT JOIN ${config.tbl_users} AS user ON (attendances.user_id = user.id)
    ${whereConditions} ORDER BY ${orderBy} ${order} LIMIT ${page}, ${limit}`, function (error, results, fields) {
        if (error) throw error;

        //query to count total record for pagination
            mysql.query(`SELECT COUNT(attendances.id) as ct FROM ${config.tbl_attendances} AS attendances
            LEFT JOIN ${config.tbl_users} AS user ON (attendances.user_id = user.id)`, function (error1, results1, fields1) {
            if (error1) throw error1;
            let total = 0;
            if (typeof results1[0] != undefined && typeof results1[0].ct != undefined) {
                total = results1[0].ct;
            }
            return res.send({ data: results, total: total });
        });
    });
});

router.get('/myattendances', VerifyToken, UserExists, function (req, res) {
    let order = req.query.order || 'DESC';
    let orderBy = req.query.orderBy || 'attendances.id';
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
                    case 'punch_in': where.push(`punch_in LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'punch_out': where.push(`punch_out LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'created_at': where.push(`created_at LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                }
            }
        }
    }

    if (where.length) {
        whereConditions = ' WHERE ' + where.join(' AND ');
    }

    mysql.query(`SELECT attendances.*, 
    CASE WHEN status = 1 THEN 'Full Day' 
         WHEN status = 2 THEN 'Half Day' 
         WHEN status = 0 THEN 'Pending' 
         WHEN status = 3 THEN 'Short Leave' 
         WHEN status = 4 THEN 'OT' 
         WHEN status = 5 THEN 'Partial' 
        ELSE '' 
    END AS statusTxt 
    FROM ${config.tbl_attendances} AS attendances ${whereConditions} ORDER BY ${orderBy} ${order} LIMIT ${page}, ${limit}`, function (error, results, fields) {
        if (error) throw error;

        //query to count total record for pagination
            mysql.query(`SELECT COUNT(*) as ct FROM ${config.tbl_attendances} AS attendances WHERE user_id=?`, req.user_id, function (error1, results1, fields1) {
            if (error1) throw error1;
            let total = 0;
            if (typeof results1[0] != undefined && typeof results1[0].ct != undefined) {
                total = results1[0].ct;
            }
            return res.send({ data: results, total: total });
        });
    });
});

router.post('/getPunching', VerifyToken, UserExists, function (req, res) {
    let user_id = req.body.user_id;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    let sql = `SELECT role_id FROM ${config.tbl_users} AS users where id=? LIMIT 1`;
    
    mysql.query(sql, user_id, function (error, results1, fields) {
        if (error) throw error;
        let role_id;

        if (typeof results1[0] != 'undefined' && typeof results1[0] != 'undefined') {
            role_id = results1[0].role_id;
        } else {
            role_id = 0;
        }

        // if role_id = 1 means admin then show some other info
        let sql = `SELECT id, punch_in, punch_out FROM ${config.tbl_attendances} AS attendances where DATE(created_at) = CURDATE() AND user_id=? LIMIT 1`;

        mysql.query(sql, user_id, function (error, results, fields) {
            if (error) throw error;

            // count all users
            let data = {};
            let totalUsers = 0;

            (async () => {
                totalUsers = await getUsersCount();
                presentUsers = await getPresentUsersCount();
                if (typeof results[0] != 'undefined' && typeof results[0] != 'undefined' && results[0].id > 0) {
                    if (role_id == 1) {
                        data = {
                            punchOut: results[0].punch_out,
                            punchIn: results[0].punch_in,
                            totalUsers: totalUsers,
                            absentToday: totalUsers-presentUsers,
                            pendingPayments: 0,
                            pendingRequests: 0
                        };
                    } else {
                        data = {
                            punchOut: results[0].punch_out,
                            punchIn: results[0].punch_in
                        };
                    }

                    return res.send({ error: false, data: data, message: 'Punched' });
                } else{
                    totalUsers = await getUsersCount();
                    presentUsers = await getPresentUsersCount();

                    if (role_id == 1) {
                        data = {
                            punchOut: '',
                            punchIn: '',
                            totalUsers: totalUsers,
                            absentToday: totalUsers - presentUsers,
                            pendingPayments: 0,
                            pendingRequests: 0
                        };
                    } else {
                        data = {
                            punchOut: '',
                            punchIn: ''
                        };
                    }

                    return res.send({ error: true, data: data, message: 'Not Punched' });
                }
            })();
        });
    });
});

router.post('/punch-in', VerifyToken, UserExists, function (req, res) {
    // check if not punched in today
    let userObj = {
        user_id: req.body.user_id,
        status: 0,
        punch_in: new Date(),
        created_at: new Date()
    };

    mysql.query(`SELECT id, punch_in FROM ${config.tbl_attendances} AS attendances where DATE(created_at) = CURDATE() AND user_id=? LIMIT 1`, req.body.user_id, function (error, results, fields) {
        if (error) throw error;

        if (typeof results[0] != 'undefined' && typeof results[0] != 'undefined' && results[0].id > 0) {
            return res.send({ error: false, data: results[0], message: 'Already Punched' });
        } else {
            mysql.query(`INSERT INTO ${config.tbl_attendances} SET ? `, userObj, function (error, result, fields) {
                if (error) {
                    console.log('error');
                    throw error;
                }

                return res.send({ error: false, data: {id: result.insertId, punch_in: new Date()}, message: 'Punch In has been made successfully.' });
            });
        }
    });
});

router.post('/punch-out', VerifyToken, UserExists, function (req, res) {
    mysql.query(`SELECT id, punch_in FROM ${config.tbl_attendances} AS attendances where DATE(created_at) = CURDATE() AND user_id=? LIMIT 1`, req.body.user_id, function (error, results, fields) {
        if (error) throw error;

        if (typeof results[0] != 'undefined' && typeof results[0] != 'undefined' && results[0].id > 0) {
            let date1 = results[0].punch_in;
            let date2 = new Date();
            let hours = Math.abs((date2.getTime() - date1.getTime()) / 3600000);
            let status = 5;

            if(hours>9) status = 4;
            else if(hours==9) status = 1;
            else if(hours<9 && hours >=7) status = 3;
            else if(hours<7 && hours >=4) status = 2;

            let userObj = {
                status: status,
                punch_out: new Date(),
                updated_at: new Date()
            };

            mysql.query(`UPDATE ${config.tbl_attendances} SET ? WHERE id = ?`, [userObj, results[0].id], function (error, result, fields) {
                if (error) throw error;
                return res.send({ error: false, data: { punch_out: new Date(), punch_in: results[0].punch_in, punchout_status: status, total_hours: hours }, message: 'Punched Out successfully.' });
            });
        } else {
            return res.send({ error: true, message: 'Please Punch In first!' });
        }
    });
});

module.exports = router;