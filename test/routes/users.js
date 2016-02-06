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
        body: {},
        params: {}
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

    describe('#update()', () => {
      it('rejects if we do not have a phone number', () => {
        users.update(req, res, next)

        expect(next).calledWith(new restifyErrors.BadRequestError('Missing Phone Number'))
      })

      it('rejects if we do not get a proper phone number', () => {
        req.params = {
          id: 'it borked'
        }

        users.update(req, res, next)

        expect(next).calledWith(new restifyErrors.BadRequestError('Malformed Phone Number'))
      })

      it('changes the number to local format and merges it to the request body and saves the user to elastic', () => {
        req.params = {
          id: '+46707100100'
        }

        req.body = {
          foo: {
            bar: {
              herp: 'derp'
            }
          }
        }

        users.update(req)

        expect(elastic.save).calledWith({
          id: '0707100100',
          foo: {
            bar: {
              herp: 'derp'
            }
          }
        })
      })

      it('sends back the userId and calls next after', () => {
        req.params = {
          id: '0707100100'
        }

        return users
          .update(req, res, next)
          .then(() => {
            expect(res.send, 'res.send').calledWith(123456)
            expect(next).calledWith()
          })
      })
    })
  })
})
