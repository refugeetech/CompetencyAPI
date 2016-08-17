'use strict'

const errors = require('restify').errors
const BadRequestError = errors.BadRequestError
const elastic = require('../adapters/elastic')
const moment = require('moment')

function update (req, res, next) {
  return elastic
    .saveUser(req.params.id, req.body)
    .then((result) => res.send(result))
    .then(() => next())
    .catch(next)
}

function get (req, res, next) {
  return elastic.getUser(req.params.id)
    .then((user) => res.send(user))
    .catch(next)
}

function create (req, res, next) {
  let phoneNumber = req.body.phoneNumber

  if (!phoneNumber) {
    return next(new BadRequestError('Missing Phone Number'))
  }

  if (!phoneNumber.match(/^([+]46|0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/)) {
    return next(new BadRequestError('Malformed Phone Number'))
  }

  phoneNumber = phoneNumber.replace('+46', '0')

  if (!phoneNumber) {
    return next(new BadRequestError('You need a phoneNumber to create a user'))
  }

  return elastic.createUser(phoneNumber)
    .then((userId) => res.send(userId))
    .catch(next)
}

function count (req, res, next) {
  return elastic.countUsers()
    .then((count) => {
      res.send({count: count.hits.total})
    })
    .catch(next)
}

function getAllUsers (req, res, next) {
  let dateFormat = 'YYYY-MM-DD'
  let dateFrom = req.params.from
  let dateTo = req.params.to || moment()

  dateFrom = moment(dateFrom, dateFormat, true)
  dateTo = moment(dateTo, dateFormat, true)

  if (!dateFrom.isValid() || !dateTo.isValid()) {
    return new errors.BadRequestError('Date needs to be valid')
  }

  return elastic.getUsersList(moment.parseZone(dateFrom.format()), moment.parseZone(dateTo.format()))
    .then((users) => {
      res.send(users)
    })
    .catch(next)
}

module.exports = {
  update,
  get: get,
  create,
  count,
  getAllUsers
}
