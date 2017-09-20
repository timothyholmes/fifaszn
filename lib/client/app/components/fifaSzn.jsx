import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';
import Header from './header.jsx';

class FifaSzn extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'fifaszn'
    }

    // Bind methods to the component
    // this.localMethod = this.localMethod.bind(this);
  }
  render () {
    return (
      <div>
        <Header
          name={ this.state.name }/>
        <div className="app-wrap">

        </div>
      </div>
    );
  }
}

export default FifaSzn;
