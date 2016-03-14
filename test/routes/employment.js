'use strict'

const oboy = require('oboy')
const restifyErrors = require('restify').errors

oboy((expect, sinon, proxyquire) => {
  let employment
  let req
  let res
  let next
  let elastic

  describe('/routes/employment', _ => {
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
        saveUser: sinon.stub(),
        '@noCallThru': true
      }

      elastic.saveUser.resolves(123456)

      employment = proxyquire(process.cwd() + '/lib/routes/employment', {})
    })

    describe('#branchesSearch()', () => {
      it('gets the stuff from Arbetsförmedlingen', () => {
        req.body = {
          branches: [3, 8]
        };

        return employment
          .branchesSearch(req, res, next)
          .then(_ => {
            expect(res.send.firstCall.args[0]).to.have.length.above(1)
          })
      })
    })
  })
})
