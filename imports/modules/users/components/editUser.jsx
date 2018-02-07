import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import container from '../../../lib/container';
import getUserName from '../../../lib/getUserName';
import Loading from '../../../ui/components/loading';
import NotFound from '../../../ui/components/notFound';
import UserEditor from './userEditor';

const EditUser = ({ user }) => (
  user ? (
    <div className="EditUser">
      <h4 className="page-header">Modifier &quot;{ user && user.profile && getUserName(user.profile) }&quot;</h4>
      <UserEditor user={user} />
    </div>
  ) : <NotFound />
);

EditUser.defaultProps = {
  user: {},
};

EditUser.propTypes = {
  user: PropTypes.object,
};

export default container(({ match }, onData) => {
  const userId = match.params._id;
  const subscription = Meteor.subscribe('users.view', userId);

  if (subscription.ready()) {
    const user = Meteor.users.findOne({ _id: userId });
    onData(null, { user });
  }
}, EditUser, { loadingHandler: () => <Loading /> });
