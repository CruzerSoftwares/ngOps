/**
 * Define all the User APIs
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
const bcrypt = require('bcryptjs');
const mysql = require('../config/mysql');
const config = require('../config/config');
const VerifyToken = require('../middlewares/VerifyToken');
const UserExists = require('../middlewares/UserExists');

// Retrieve all users 
router.get('/', VerifyToken, UserExists, function (req, res) {
    let order = req.query.order || 'ASC';
    let orderBy = req.query.orderBy || 'users.id';
    if (orderBy == 'users.name') orderBy = "CONCAT(users.first_name, ' ', users.last_name)";
    let limit = req.query.pageSize ||10;
    let page = req.query.page || 0;
    page = page > 0 ? (page - 1) * limit : 0;
    let where = [];
    let whereConditions='';

    if(req.query.search){
        for (var key in req.query.search) {
            if (req.query.search.hasOwnProperty(key)) {
                switch(key) {
                    case 'id': where.push('id=' + decodeURIComponent(req.query.search[key])); break;
                    case 'name': where.push(`CONCAT(first_name, ' ', last_name) LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'email': where.push(`email LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                    case 'status': where.push(`status='${decodeURIComponent(req.query.search[key])}'`); break;
                    case 'created_at': where.push(`created_at LIKE '%${decodeURIComponent(req.query.search[key])}%'`); break;
                }
            }
        }
        if (where.length){
            whereConditions = ' WHERE '+where.join(' AND ');
        }
    }

    mysql.query(`SELECT users.*, 
    CASE WHEN status = 1 THEN 'Active' 
         WHEN status = 2 THEN 'Inactive' 
         WHEN status = 0 THEN 'Draft' 
         WHEN status=3 THEN 'Blocked' 
         WHEN status = 4 THEN 'Pending' 
        ELSE '' 
    END AS statusTxt 
    FROM ${config.tbl_users} AS users ${whereConditions} ORDER BY ${orderBy} ${order} LIMIT ${page}, ${limit}`, function (error, results, fields) {
        if (error) throw error;

        //query to count total record for pagination
            mysql.query(`SELECT COUNT(*) as ct FROM ${config.tbl_users} AS users`, function (error1, results1, fields1) {
            if (error1) throw error1;
            let total = 0;
            if (typeof results1[0] != undefined && typeof results1[0].ct != undefined ){
                total = results1[0].ct;
            }
            return res.send({ data: results, total: total });
        });
    });
});


// Retrieve user with id 
router.get('/:id', VerifyToken, UserExists, function (req, res) {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }

    let sql = `SELECT users.*, users.status AS statusId, 
    CASE 
        WHEN status = 1 THEN 'Active' 
        WHEN status = 2 THEN 'Inactive' 
        WHEN status = 0 THEN 'Draft' 
        WHEN status=3 THEN 'Blocked' 
        WHEN status = 4 THEN 'Pending' 
      ELSE '' 
    END AS status 
    FROM ${config.tbl_users} AS users where id=? LIMIT 1`;

    mysql.query(sql, id, function (error, results, fields) {
        if (error) throw error;
        if (typeof results[0] != 'undefined'){
            return res.send(results[0]);
        } else{
            return res.send(results);
        }
    });
});


// Add a new user  
router.post('/', VerifyToken, UserExists, function (req, res) {
    let userObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        status: req.body.status,
        created_at: new Date()
    };

    mysql.query(`INSERT INTO ${config.tbl_users} SET ? `, userObj, function (error, results, fields) {
        if (error) {
            console.log('error');
            throw error;
        }
        return res.send({ error: false, data: results, message: 'New User has been created successfully.' });
    });
});


//  Update user with id
router.put('/:id', VerifyToken, UserExists, function (req, res) {
    let id = req.params.id;
    let user = req.body.user;
    
    // if (!id || !user) {
    if (!id) {
        return res.status(400).send({ error: user, message: 'Please provide user and id' });
    }

    let userObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        status: req.body.status,
        phone: req.body.phone,
        updated_at: new Date()
    };

    mysql.query(`UPDATE ${config.tbl_users} SET ? WHERE id = ?`, [userObj, id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'User has been updated successfully.' });
    });
});


//  Delete user
router.delete('/:id', VerifyToken, UserExists, function (req, res) {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    mysql.query(`DELETE FROM ${config.tbl_users} WHERE id = ?`, [id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'User has been deleted successfully.' });
    });
});

//  Delete multiple users
router.post('/deleterows', VerifyToken, UserExists, function (req, res) {
    let ids = req.body.ids;
    if (!ids) {
        return res.status(400).send({ error: true, message: 'Please provide ids' });
    }
    
    if (!ids.length) {
        return res.status(400).send({ error: true, message: 'Please provide ids' });
    }

    mysql.query(`DELETE FROM ${config.tbl_users} WHERE (id) IN (?)`, [ids], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'Users has been deleted successfully.' });
    });
});

module.exports = router;