const mysql = require('mysql2/promise')
require('dotenv').config()

const db = mysql.createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_host,
    user: process.env.DB_user
})

db.query('select 1 + 1 as result', (err, res)=>{
    if(err) console.log(err)
    console.log('Connected to DB')
})

module.exports = db