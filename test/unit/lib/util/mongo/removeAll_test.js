
const Lab = require('lab');
const should = require('should');
const bluebird = require('bluebird');
const sinon = require('sinon');
const removeAll = require('../../../../../lib/util/mongo/removeAll');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Utilities', () => {
  describe('Mongo', () => {
    describe('removeAll', () => {
      it('should removeAll data', (done) => {
        const removeStub = sinon.stub().returns(bluebird.resolve(true));
        const dbStub = {
          collection: sinon.stub().returns({
            remove: removeStub
          })
        };

        removeAll(
          {
            query: true
          },
          'collectionName',
          dbStub
        ).then((response) => {
          should(removeStub.firstCall.args[0]).equal(true);
          should(dbStub.collection.firstCall.args[0]).equal('collectionName');
          should(response.success).equal(true);
          should(response.result).equal(true);
          done();
        });
      });
    });
  });
});
