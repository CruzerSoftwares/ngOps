/**
 * Define all the Authentication APIs
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const mysql = require('../config/mysql');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const VerifyToken = require('../middlewares/VerifyToken');
const checkUserExists = require('../middlewares/UserExists');
const crypto = require('crypto');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function addLoginEntry(req, status, user_id){
    // console.log(req.ip);  ::ffff:127.0.0.1
    let userObj = {
        os: req.body.os,
        os_version: req.body.os_version,
        browser: req.body.browser,
        browser_version: req.body.browser_version,
        ip: req.body.ip,
        device: req.body.device,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        email: req.body.email,
        user_id: user_id,
        status: status,
        created_at: new Date()
    };

    mysql.query(`INSERT INTO ${config.tbl_logins} SET ? `, userObj, function (error, results, fields) {
        if (error) {
            console.log('error');
            throw error;
        }
    });
}

router.post('/login', function(req, res) {
    mysql.query(`SELECT * FROM ${config.tbl_users} AS users where status=1 AND email=?`, req.body.email, function (error, results, fields) {
        if (error) throw error;

        let user = results[0];

        if (typeof user == 'undefined' || user == null) {
            addLoginEntry(req,0, null);

            return res.status(200).send({ success: false, msg: "Invalid/Email Password", auth: false, token: null });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        
        if (!passwordIsValid) {
            addLoginEntry(req, 0, null);

            return res.status(200).send({ success: false, msg: "Invalid/Email Password", auth: false, token: null });
        }

        // if user is found and password is valid create a token
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // log all the user agents
        addLoginEntry(req, 1, user.id);

        // return the information including token as JSON
        let avatar = crypto.createHash('md5').update(user.email).digest("hex");
        return res.status(200).send({ success: true, msg: "Login Successful", auth: true, token: token, id: user.id, role_id: user.role_id, title: user.title, first_name: user.first_name, last_name: user.last_name, email: user.email, phone: user.phone, avatar: avatar });
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.get('/me', VerifyToken, checkUserExists, function(req, res) {
    mysql.query(`SELECT first_name, last_name, email, id FROM  ${config.tbl_users} where status=1 AND id=?`, req.user_id, function (error, results, fields) {
        if (error) throw error;
        let user = results[0];
        if (user == null) {
            return res.status(500).send({ auth: false, message: 'User does not exists!' });
        }

        res.status(200).send({ error: false, data: user, message: 'Provided' });
    });
});

router.put('/me', VerifyToken, checkUserExists, function(req, res) {
    let userObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        updated_at: new Date()
    };

    mysql.query(`UPDATE ${config.tbl_users} SET ? WHERE id = ?`, [userObj, req.user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'Profile has been updated successfully.' });
    });
});

router.put('/update-password', VerifyToken, checkUserExists, function(req, res) {
    // check if old password is correct
    if (req.body.oldPassword == '' ){
        res.status(200).send({ error: true, data: user, message: 'Please provide Old Password' });
    } else if (req.body.password != req.body.confirmPassword ) {
        res.status(200).send({ error: true, data: user, message: 'Password & Confirm password do not match' });
    } else if (req.body.password.strlen < 6) {
        res.status(200).send({ error: true, data: user, message: 'Password lenght should be at least 6 characters long.' });
    }

    mysql.query(`SELECT password FROM  ${config.tbl_users} where id=?`, req.user_id, function (error, results, fields) {
        if (error) throw error;
        let userData = results[0];
        if (userData == null) {
            return res.status(500).send({ error: true, message: 'User does not exists!' });
        }
        let passwordIsValid = bcrypt.compareSync(req.body.oldPassword, userData.password);
        if (!passwordIsValid){
            // return res.status(200).send({ error: true, message: 'Old Password is wrong' });
        }
        
        let userObj = {
            password: bcrypt.hashSync(req.body.password, 8),
            updated_at: new Date()
        };

        mysql.query(`UPDATE ${config.tbl_users} SET ? WHERE id = ?`, [userObj, req.user_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, message: 'Password has been updated successfully.' });
        });
    });
});

module.exports = router;