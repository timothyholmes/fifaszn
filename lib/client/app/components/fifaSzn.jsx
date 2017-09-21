import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';
import env from '../../../../config/env.js';
import Header from './header.jsx';
import FullScreenCard from './fullScreenCard.jsx';

class FifaSzn extends React.Component {
  constructor() {
    super();

    this.state = {
      name: 'fifaszn',
      seasons: []
    }
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
        <FullScreenCard key={ key } name={ doc.name } id={ doc.seasonId }/>
      )
    });

    return (
      <div>
        <Header name={ this.state.name } />
        <div className="app-wrap">
          { seasonCards }
        </div>
      </div>
    );
  }
}

export default FifaSzn;
