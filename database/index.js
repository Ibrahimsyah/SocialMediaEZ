const mysql = require('mysql2/promise')
require('dotenv').config()

const db = mysql.createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

db.query('select 1 + 1 as result', (error, res)=>{
    if(!error){
        console.log("Connected to DB")
    }
})

module.exports = db