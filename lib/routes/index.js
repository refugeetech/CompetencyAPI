'use strict'

module.exports = {
  index (req, res, next) {
    res.send('I am alive')
    next()
  }
}
