
module.exports = {
  expectedSuccess: {
    players: [{
      id: '2',
      day: 0,
      points: 0,
      team: 'Man U',
      name: 'Andrew',
      color: 'ff0000',
      cpu: true,
      schedule: [
        { id: '3', name: 'Matt' },
        { id: '4', name: 'Tim' },
        { id: '5', name: 'Tony' }
      ],
      history: [
        {
          home: {
            id: '4',
            points: 3
          },
          away: {
            id: '2',
            points: 0
          }
        }
      ]
    }, {
      id: '3',
      day: 0,
      points: 0,
      team: 'Chelsea',
      name: 'Matt',
      color: '00ff00',
      cpu: true,
      schedule: [
        { id: '2', name: 'Andrew' },
        { id: '4', name: 'Tim' },
        { id: '5', name: 'Tony' }
      ],
      history: []
    }, {
      id: '4',
      day: 1,
      points: 3,
      team: 'HotSpurs',
      name: 'Tim',
      color: '0000ff',
      cpu: false,
      schedule: [
        { id: '2', name: 'Andrew' },
        { id: '3', name: 'Matt' },
        { id: '5', name: 'Tony' }
      ],
      history: [
        {
          home: {
            id: '4',
            points: 3
          },
          away: {
            id: '2',
            points: 0
          }
        }
      ]
    }, {
      id: '5',
      day: 0,
      points: 0,
      team: 'Arsenal',
      name: 'Tony',
      color: 'ffff00',
      cpu: false,
      schedule: [
        { id: '2', name: 'Andrew' },
        { id: '3', name: 'Matt' },
        { id: '4', name: 'Tim' }
      ],
      history: []
    }],
    name: 'Unit Testing',
    insertDate: '12345',
    seasonId: '6'
  }
};
