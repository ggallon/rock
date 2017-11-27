import React from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';

const LoadableLoading = (props) => {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    return <Loading />;
  }
  return null;
};

LoadableLoading.defaultProps = {
  error: false,
};

LoadableLoading.propTypes = {
  pastDelay: PropTypes.bool.isRequired,
  timedOut: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export default LoadableLoading;
