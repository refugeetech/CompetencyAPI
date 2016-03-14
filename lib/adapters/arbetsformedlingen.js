'use strict'

var request = require('request-promise')

function flatten(a, b) {
  if (Array.isArray(a)) {
    return a.concat(b);
  }
  return [a].concat(b);
}

function getArea (id) {
  const options = {
    url: `http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesgrupper?yrkesomradeid=${id}`,
    json: true,
    headers: {
      'Accept': '*',
      'accept-language': 'json'
    }
  }

  return request(options)
    .then(result => {
      return result.soklista.sokdata;
    })
}

function getAreas (branches) {
  return Promise
    .all(
      branches.map(groupId =>
        getArea(groupId)
          .catch(err => null)
      )
    )
    .then(results =>
      results
        .filter(result => result)
        .reduce(flatten, [])
    )
}


module.exports = {
  getAreas
}
