import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';
import env from '../../../../config/env.js';
import Header from './header.jsx';
import FullScreenCard from './fullScreenCard.jsx';
import NewSzn from './newSzn.jsx';

class FifaSzn extends React.Component {
  constructor() {
    super();

    this.state = {
      name: 'FIFASZN',
      active: 'LANDING',
      currentSeason: {},
      seasons: []
    }
  }
  updateView(view) {
    const newState = _.clone(this.state);

    newState.active = view;

    this.setState(newState);
  }
  selectSeason(options) {
    const newState = _.clone(this.state);

    newState.currentSeason = options.season;
    newState.active = options.active;

    this.setState(newState);
  }
  componentDidMount() {
    axios.get(`${env.API_HOST}/v1/season/list/`)
      .then(res => {
        this.setState({
          seasons: res.data.resp
        });
      });
  }
  render () {
    const seasonDocs = _.cloneDeep(this.state.seasons);

    const seasonCards = seasonDocs.map((doc, key) => {
      return (
        <FullScreenCard
          key={ doc.seasonId }
          header={ doc.name }
          onClick={ () => this.selectSeason(
            {
              season: {},
              active: 'SOLOSZN'
            }
          )}
        />
      )
    });

    return (
      <div>
        <Header
          name={ this.state.name.toLowerCase() }
          onClick={ () => this.selectSeason(
            {
              season: {},
              active: 'LANDING'
            }
          )}
        />
          <div className="app-wrap">
            {
              this.state.active === 'LANDING' ? (
                <section>
                  <FullScreenCard
                    header='+ Start New Season'
                    onClick={ () => this.updateView('NEWSZN') }
                    />
                  <h2> Current Seasons: </h2>
                  { seasonCards }
                </section>
              ) : this.state.active === 'NEWSZN' ? (
                <NewSzn />
              ) : this.state.active === 'SOLOSZN' ? null : null
            }
          </div>
      </div>
    );
  }
}

export default FifaSzn;
