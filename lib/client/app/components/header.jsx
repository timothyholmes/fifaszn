import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name
    };

    // Bind methods to the component
    // this.localMethod = this.localMethod.bind(this);
  }
  render () {
    return (
      <div className="header">
        { this.state.name }
      </div>
    );
  }
}

export default Header;
