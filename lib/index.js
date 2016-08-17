'use strict'

const restify = require('restify')
const routes = require('./routes')
const port = process.env.PORT || 1337
const elastic = require('./adapters/elastic')

const authorizeSignedRequest = require('./middleware/signedRequest').authorize

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

server.post('/users', routes.users.create)
server.get('/users/:id', routes.users.get)
server.put('/users/:id', routes.users.update)
server.get('/users/count', routes.users.count)

server.get('/users', routes.users.getAllUsers)

server.get('/proficiencies/:id', routes.proficiencies.children)

server.post('/employment/branches/search', routes.employment.branchesSearch)

server.get('/occupations', routes.occupations.getList)

server.get('/visualization', routes.occupations.getsAggregations)

server.get('/profiles/:phone', routes.profiles.get)
// server.post('/profile/:phone', authorizeSignedRequest, routes.users.save)

server.listen(port, () => {
  console.log('listening on %s', port)
})
