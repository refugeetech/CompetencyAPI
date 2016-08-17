'use strict'

const crypto = require('crypto')
const restify = require('restify')

function authorize (req, res, next) {
  const requestBody = JSON.stringify(req.body)
  const signedRequestSecret = process.env.SIGNED_REQUEST_SECRET || 'competency'
  const calculatedHash = crypto.createHmac('sha512', signedRequestSecret).update(requestBody).digest('base64')
  const digestHash = req.headers.digest.replace('HMAC-SHA512=', '')

  console.log('>>> Received a signed request!')
  console.log('   ', '(Locally calculated hash)', calculatedHash)
  console.log('   ', '(Hash from digest header)', digestHash)
  console.log('   ', '(Signed request valid)', digestHash === calculatedHash)
  console.log('')

  if (requestBody.timestamp) {
    // TODO: Check timestamp age.
  }

  if (digestHash === calculatedHash) {
    next()
  } else {
    const err = new restify.errors.UnauthorizedError({body: {
      'error': 'invalid_digest_header',
      'error_description': 'Invalid Digest Header'
    }})
    res.statusCode = err.statusCode
    res.end()
    next(err)
  }
}
module.exports = {
  authorize
}
