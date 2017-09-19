
const Lab = require('lab');
const should = require('should');
const bluebird = require('bluebird');
const sinon = require('sinon');
const insert = require('../../../../../lib/util/mongo/insert');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Utilities Test', () => {
  describe('Mongo Insert', () => {
    it('should insert data', (done) => {
      const insertAsyncStub = sinon.stub().returns(bluebird.resolve({
        insertedCount: 4
      }));
      const dbStub = {
        collection: sinon.stub().returns({
          insertAsync: insertAsyncStub
        })
      };

      insert(
        { mock: 'payload' },
        'collectionName',
        dbStub
      ).then((response) => {
        should(insertAsyncStub.firstCall.args[0].mock).equal('payload');
        should(dbStub.collection.firstCall.args[0]).equal('collectionName');
        should(response.success).equal(true);
        should(response.recordsInserted).equal(4);
        done();
      });
    });
  });
});
