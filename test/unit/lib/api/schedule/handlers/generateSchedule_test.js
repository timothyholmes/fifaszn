
const Lab = require('lab');
const should = require('should');
const sinon = require('sinon');
const generateSchedule = require('../../../../../../lib/api/schedule/handlers/generateSchedule');
const mocks = require('../../../../../mocks/generateScheduleMocks.js');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Generate Schedule Route', () => {
  it('should generate a schedule and initialize data', (done) => {
    const codeStub = sinon.stub();
    const replyStub = sinon.stub().returns({ code: codeStub });
    const requestStub = {
      payload: {
        seasonName: 'Unit Testing',
        players: [
          {
            id: '1',
            team: 'Man U',
            color: 'ff0000',
            cpu: true
          },
          {
            id: '2',
            team: 'Chelsea',
            color: '00ff00',
            cpu: true
          },
          {
            id: '3',
            team: 'HotSpurs',
            color: '0000ff',
            cpu: false
          },
          {
            id: '4',
            team: 'Arsenal',
            color: 'ffff00',
            cpu: false
          }
        ]
      }
    };
    const expected = mocks.expectedSuccess;

    generateSchedule.handler(requestStub, replyStub);

    should(replyStub.firstCall.args[0].message).equal('New schedules created');
    should(replyStub.firstCall.args[0].result).deepEqual(expected);
    should(codeStub.firstCall.args[0]).deepEqual(200);

    done();
  });
  it('should return error when players are incorrect size', (done) => {
    const codeStub = sinon.stub();
    const replyStub = sinon.stub().returns({ code: codeStub });
    const requestStub = {
      payload: {
        seasonName: 'Unit Testing',
        players: [
          {
            id: '1',
            team: 'Man U',
            color: 'ff0000',
            cpu: true
          }
        ]
      }
    };

    generateSchedule.handler(requestStub, replyStub);

    should(replyStub.firstCall.args[0].message).equal('Must be a multiple of 4 players in a season');
    should(codeStub.firstCall.args[0]).deepEqual(400);

    done();
  });
});
