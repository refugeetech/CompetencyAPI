'use strict'

const errors = require('restify').errors
const BadRequestError = errors.BadRequestError
const elastic = require('../adapters/elastic')


function get (req, res, next) {
  return elastic.getProfs(req.params.id)
    .then(root => res.send(root.hits.hits))
    .catch(next)
}

module.exports = {
  get: get
}
