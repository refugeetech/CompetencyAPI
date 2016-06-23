'use strict'

const elastic = require('../adapters/elastic')

function get (req, res, next) {
  console.log('mhm', req.params.phone)
  return elastic.getUserByPhone(req.params.phone)
    .then(result => {
      try {
        res.send(result.hits.hits[0]._source)
      } catch (exception) {
        res.statusCode = 404
        res.send({
          message: 'No profile found.'
        })
      }
    })
    .catch(next)
}

module.exports = {
  get
}
