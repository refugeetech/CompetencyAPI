'use strict'

const oboy = require('oboy')
const restifyErrors = require('restify').errors

oboy((expect, sinon, proxyquire) => {
  let users
  let req
  let res
  let next


  describe('/routes/users', _ => {
    beforeEach(() => {
      next = sinon.spy()
      req = {
        body: {}
      }
      res = {}

      users = proxyquire(process.cwd() + '/lib/routes/users', {})
    })

    it('rejects if we do not have a phone number', () => {
      users.create(req, res, next)

      expect(next).calledWith(new restifyErrors.BadRequestError('Missing Phone Number'))
    })
  })
})
