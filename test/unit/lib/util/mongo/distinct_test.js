
const Lab = require('lab');
const should = require('should');
const bluebird = require('bluebird');
const sinon = require('sinon');
const distinct = require('../../../../../lib/util/mongo/distinct');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Utilities', () => {
  describe('Mongo', () => {
    describe('Find One', () => {
      it('should return data', (done) => {
        const distinctStub = sinon.stub().returns(
          bluebird.resolve({
            sample: 'results'
          })
        );
        const dbStub = {
          collection: sinon.stub().returns({
            distinct: distinctStub
          })
        };

        distinct(
          {
            distinction: 'hello'
          },
          'collectionName',
          dbStub
        ).then((response) => {
          should(dbStub.collection.firstCall.args[0]).equal('collectionName');
          should(distinctStub.firstCall.args[0]).equal('hello');
          should(response.success).equal(true);
          should(response.result.sample).equal('results');
          done();
        });
      });
    });
  });
});
