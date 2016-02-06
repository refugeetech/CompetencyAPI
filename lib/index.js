'use strict'

const restify = require('restify')
const routes = require('./routes')
const port = process.env.PORT || 1337

let server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.get('/', routes.index)

server.listen(port, () => {
  console.log('listening on %s', port)
})
