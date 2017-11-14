import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class AppState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
    };
    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(updater, callback) {
    // newState can be object or function!
    this.setState(updater, () => {
      if (this.props.debug) {
        console.log('setAppState', JSON.stringify(this.state));
      }
      if (callback) {
        callback();
      }
    });
  }

  render() {
    return (
      <div className="AppState">
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            appState: this.state,
            setAppState: this.setAppState,
          }),
        )}
      </div>
    );
  }
}

AppState.defaultProps = {
  debug: false,
};

AppState.propTypes = {
  debug: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default AppState;
