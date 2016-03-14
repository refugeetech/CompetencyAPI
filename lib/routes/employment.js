'use strict'

const arbetsformedlingen = require('../adapters/arbetsformedlingen')

function branchesSearch (req, res, next) {
  return arbetsformedlingen
    .getAreas(req.body.branches)
    .then(result => res.send(result))
    .then(_ => next())
    .catch(error => {
      console.log('error', error)
      next(error)
    })
}

module.exports = {
  branchesSearch
}
