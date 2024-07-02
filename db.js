const mysql = require("mysql2/promise")

const mysqlpool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Amuah2420',
    database:'mhealth_db'
})

module.exports = mysqlpool
