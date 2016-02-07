'use strict'

const restify = require('restify')
const routes = require('./routes')
const port = process.env.PORT || 1337
const elastic = require('./adapters/elastic')

let server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.CORS({
  origins: ['*'],
  credentials: false, // defaults to false
  headers: ['']  // sets expose-headers
}))

elastic.init()

server.get('/', routes.index)

server.put('/users/:id', routes.users.update)

server.post('/users', routes.users.create)

server.get('/users/:id', routes.users.get)

server.get('/proficiencies/:id', routes.proficiencies.get)

server.listen(port, () => {
  console.log('listening on %s', port)
})
