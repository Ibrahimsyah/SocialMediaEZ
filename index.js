require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.port || 80
const router = require('./router')

//database init
require('./database')

//middlewares
app.use(express.json())

//router
app.use('/~munchrev', router)

app.listen(port, () =>{
    console.log('Listening to port', port)
})