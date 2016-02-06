'use strict'

const oboy = require('oboy')
const restifyErrors = require('restify').errors

oboy((expect, sinon, proxyquire) => {
  let users
  let req
  let res
  let next
  let elastic

  describe('/routes/users', _ => {
    beforeEach(() => {
      next = sinon.spy()

      req = {
        body: {}
      }

      res = {
        send: sinon.spy()
      }

      elastic = {
        save: sinon.stub(),
        '@noCallThru': true
      }

      elastic.save.resolves(123456)

      users = proxyquire(process.cwd() + '/lib/routes/users', {
        '../adapters/elastic': elastic
      })
    })

    it('rejects if we do not have a phone number', () => {
      users.create(req, res, next)

      expect(next).calledWith(new restifyErrors.BadRequestError('Missing Phone Number'))
    })

    it('saves the user to elastic', () => {

      req.body = {
        phoneNumber: '0707100100'
      }

      users.create(req)

      expect(elastic.save).calledWith({
        phoneNumber: '0707100100'
      })
    })

    it('sends back the userId and calls next after', () => {
      req.body = {
        phoneNumber: '0707100100'
      }

      return users
        .create(req, res, next)
        .then(() => {
          expect(res.send, 'res.send').calledWith(123456)
          expect(next).calledWith()
        })
    })
  })
})
