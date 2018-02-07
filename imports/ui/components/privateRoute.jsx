import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggingIn, authenticated, component, location, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated
        ? (React.createElement(component, { loggingIn, authenticated, ...rest, ...props }))
        : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
      )
    }
  />
);

PrivateRoute.defaultProps = {
  location: null,
};

PrivateRoute.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default PrivateRoute;
