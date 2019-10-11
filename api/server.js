/**
 * This is the entry point of the application
 * It includes routes and parser and packages
 * to serve our APIs
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const config = require('./config/config');
const AuthRoute = require('./auth/AuthController');
const userRoute = require('./routes/user.route');
const attendanceRoute = require('./routes/attendance.route');
const logRoute = require('./routes/logs.route');
const loginsRoute = require('./routes/logins.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());//compress every route

app.use('/auth', AuthRoute);
app.use('/users', userRoute);
app.use('/attendance', attendanceRoute);
app.use('/logs', logRoute);
app.use('/logins', loginsRoute);

// set port
app.listen(config.port, function () {
    console.log(`Node Express is running on port ${config.port}`);
});

module.exports = app;