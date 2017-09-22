import _ from 'lodash';
import React from 'react';
import Player from './player.js';
import {render} from 'react-dom';
import axios from 'axios';
import env from '../../../../config/env.js';
import '../../public/main.css';

class NewSzn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      playerCount: 0,
      season: {
        seasonName: '',
        players: []
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.playerInc = this.playerInc.bind(this);
    this.toggleCpu = this.toggleCpu.bind(this);
    this.postNewSeason = this.postNewSeason.bind(this);
  }
  handleChange(event) {
    const newState = _.cloneDeep(this.state);
    if (/cpu/.test(event.target.name)) {
      _.set(newState, event.target.name, Boolean(event.target.value));
      return this.setState(newState);
    }
    _.set(newState, event.target.name, event.target.value);
    return this.setState(newState);
  }
  playerInc(inc) {
    const newState = _.cloneDeep(this.state);
    newState.playerCount += inc;
    if (newState.playerCount <= 0) {
      return this.setState({
        playerCount: 0,
        season: {
          players: []
        }
      });
    } else if (newState.playerCount < this.state.playerCount) {
      return this.setState({
        playerCount: newState.playerCount,
        season: {
          players: newState.season.players.slice(0, newState.playerCount)
        }
      });
    } else {
      while(newState.playerCount > newState.season.players.length) {
        newState.season.players.push(new Player());
      }
      return this.setState(newState);
    }
  }
  toggleCpu(i) {
    const newState = _.cloneDeep(this.state);
    newState.season.players[i].cpu = !newState.season.players[i].cpu;
    return this.setState(newState);
  }
  postNewSeason() {
    console.log('this.state.season', this.state.season);
    axios.post(`${env.API_HOST}/v1/season/`, this.state.season)
      .then(res => {
        const newState = _.cloneDeep(this.state);
        newState.submitted = true;
        this.setState(newState);
      });
  }
  render () {
    const players = _.cloneDeep(this.state.season.players);

    const newPlayerForms = players.map((player, key) => {
      const idString=`season.players[${key}].`;
      return (
        <div key={ key }>
          <h1>New Players</h1>
          <label>
            Name:
          </label>
          <input
            type="text"
            name={ idString + 'name' }
            value={ this.state.season.players[key].name }
            onChange={ this.handleChange } />
          <label>
            Team:
          </label>
          <input
            type="text"
            name={ idString + 'team' }
            value={ this.state.season.players[key].team }
            onChange={ this.handleChange } />
          <label>
            Color:
          </label>
          <input
            type="text"
            name={ idString + 'color' }
            value={ this.state.season.players[key].color }
            onChange={ this.handleChange } />
          <label>
            CPU: { String(this.state.season.players[key].cpu) }
          </label>
          <button onClick={ () => this.toggleCpu(key) }>cpu toggle</button>
        </div>
      )
    });

    return (
      <section>
          {
            this.state.submitted === false ? (
              <div>
                <h2> New Season: </h2>
                <div>
                  <label>
                    Season Name:
                  </label>
                  <input type="text"
                    name="season.seasonName"
                    value={ this.state.season.seasonName }
                    onChange={ this.handleChange } />
                </div>
                Players:
                <button onClick={ () => this.playerInc(-4) }>-</button>
                {this.state.playerCount}
                <button onClick={ () => this.playerInc(4) }>+</button>
                { newPlayerForms }
                <button onClick={ () => this.postNewSeason() }> Submit </button>
              </div>
            ) : this.state.submitted === true ? (
              <h2>~*~*~*~new season added~*~*~*~</h2>
            ) : null
          }
      </section>
    );
  }
}

export default NewSzn;
