
const Lab = require('lab');
const should = require('should');
const bluebird = require('bluebird');
const sinon = require('sinon');
const find = require('../../../../../lib/util/mongo/find');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Utilities', () => {
  describe('Mongo', () => {
    describe('Find One', () => {
      it('should return data', (done) => {
        const toArrayStub = sinon.stub().returns(bluebird.resolve({
          sample: 'results'
        }));
        const limitStub = sinon.stub().returns({
          toArray: toArrayStub
        });
        const sortStub = sinon.stub().returns({
          limit: limitStub
        });
        const findStub = sinon.stub().returns({
          sort: sortStub
        });
        const dbStub = {
          collection: sinon.stub().returns({
            find: findStub
          })
        };

        find(
          {
            limit: 55,
            query: 'query',
            sort: 'sort'
          },
          'collectionName',
          dbStub
        ).then((response) => {
          should(dbStub.collection.firstCall.args[0]).equal('collectionName');
          should(findStub.firstCall.args[0]).equal('query');
          should(sortStub.firstCall.args[0]).equal('sort');
          should(limitStub.firstCall.args[0]).equal(55);
          should(toArrayStub.callCount).equal(1);
          should(response.success).equal(true);
          should(response.result.sample).equal('results');
          done();
        });
      });
    });
  });
});
