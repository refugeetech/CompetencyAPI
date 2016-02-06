'use strict'

const oboy = require('oboy')


oboy((expect, sinon, proxyquire) => {
  describe('elastic', () => {
    let elasticsearch = {};
    let elastic;
    let nconf;
    let client;

    beforeEach(() => {
      elasticsearch = {
        Client: sinon.stub()
      }

      client = {
        ping: sinon.stub()
      }

      elasticsearch.Client.returns(client)

      nconf = {
        get: sinon.stub()
      }

      elastic = proxyquire(process.cwd() + '/lib/adapters/elastic', {
        'elasticsearch': elasticsearch,
        '../config/nconf': nconf
      })

    });

    describe('#init', () => {
      it('calls elasticsearch ', () => {
        nconf.get.withArgs('elasticsearch:host').returns('localhost')
        nconf.get.withArgs('elasticsearch:port').returns(1337)

        elastic.init();

        expect(elasticsearch.Client).called;
      });
    });

    describe('#save()', () => {
      it('should save user', () => {
        let phoneNumber = '0761681102'

        return elastic.saveUser(phoneNumber)
          .then(result => {
            expect(result).to.have.ownProperty('userId')
          })
      });
    });
  });
})