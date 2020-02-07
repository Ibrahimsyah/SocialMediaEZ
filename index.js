require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.port || 80
const router = require('./router')

//database init
require('./database')

//middlewares
app.use(express.json())
app.use(cors())

//router
app.use(router)

app.listen(port, () =>{
    console.log('Listening to port', port)
})