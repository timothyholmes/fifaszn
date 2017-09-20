import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'fifaszn'
    }

    // Bind methods to the component
    this.adjustSingleStateProperty = this.adjustSingleStateProperty.bind(this);
  }
  adjustSingleStateProperty(newVal, prop) {
    const newState = _.clone(this.state);

    if (newState[prop] === newVal) {
      return;
    }

    newState[prop] = newVal;

    this.setState(newState);
  }
  render () {
    return (
      <div className="app-wrap">
        Hello World
      </div>
    );
  }
}

export default Example;
