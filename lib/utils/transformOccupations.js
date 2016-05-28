'use strict'

function transform (data) {
  let key = Object.keys(data).find(name => name.indexOf('_groups') > -1)
  if (key) {
    data.children = data[key]
    data[key] = undefined
    data.children.forEach(x => transform(x))
  }
}

module.exports = transform
