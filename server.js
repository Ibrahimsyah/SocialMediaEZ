require('dotenv').config()
const http = require('http')
const port = process.env.port || 1433

const app = require('./index')

app.set('port', port)

const server = http.createServer(app)
server.listen(port, () => {
    console.log("listening to", port)
})