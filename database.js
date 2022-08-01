const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'quizapp',
    password: 'lu84657397'
})

module.exports = pool.promise();