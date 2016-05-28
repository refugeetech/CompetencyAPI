'use strict'

const transform = require('../utils/transformOccupations')

function getList (req, res, next) {
  const language = req.params.language || 'en'
  let data
  try {
    data = require(`../../data/isco.${language}.json`)
    transform(data)
    res.send(data)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getList
}
