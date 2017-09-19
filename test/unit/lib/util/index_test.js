
const Lab = require('lab');
const should = require('should');
const path = require('path');
const sinon = require('sinon');
const server = require('../../../../lib/util/index');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Utilities Test', () => {
  describe('Register method', () => {
    it('Should call wireRoutes with path and server', (done) => {
      const nextStub = sinon.stub();
      const serverStub = {
        expose: sinon.stub()
      };

      server.register(serverStub, {}, nextStub)
        .then(() => {
          should(nextStub.callCount).equal(1);
          should(serverStub.expose.firstCall.args[0]).deepEqual('helpers');
          should(serverStub.expose.firstCall.args[1]).deepEqual(server.methods);

          done();
        });
    });
  });
  describe('wireRoute method', () => {
    it('Should call route with requires in specified directory', (done) => {
      const pathToMockData = path.resolve('test/mocks/mockDir');
      const serverStub = {
        route: sinon.stub()
      };

      server.methods.wireRoute(pathToMockData, serverStub);

      should(serverStub.route.getCall(0).args[0].futureHendrix).equal(true);
      should(serverStub.route.getCall(0).args[0].superFuture).equal(true);
      should(serverStub.route.getCall(0).args[0].astronaut).equal(true);
      should(serverStub.route.getCall(0).args[0].pluto).equal(true);

      done();
    });
  });
});
