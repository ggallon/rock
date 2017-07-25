import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import getUserName from '/imports/lib/getUserName';

import App from '/imports/ui/layouts/app.jsx';

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && getUserName(user.profile);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    connected: Meteor.status().connected,
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    user,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
  };
}, App);
