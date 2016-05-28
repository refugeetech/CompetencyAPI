'use strict'

function isco (language) {
  return new Promise((resolve, reject) => {
    var json = require(`../../data/isco.${language}.json`)
    resolve(json)
  })
}

module.exports = {
  isco
}
