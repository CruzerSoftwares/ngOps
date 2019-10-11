/**
 * Define all the the variables to expose to the app
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.SECRET,
  db_host: process.env.DB_HOSt,
  db_port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  tbl_role: process.env.TBL_ROLE,
  tbl_users: process.env.TBL_USERS,
  tbl_attendances: process.env.TBL_ATTENDANCES,
  tbl_holidays: process.env.TBL_HOLIDAYS,
  tbl_logins: process.env.TBL_LOGINS,
  tbl_logs: process.env.TBL_LOGS,
};