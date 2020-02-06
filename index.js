const express = require('express')
const app = express()
const router = require('./router')
//database init
require('./database')

//middlewares
app.use(express.json())

//router
app.use('/', router)

module.exports = app