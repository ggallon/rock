import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Grid from 'react-bootstrap/lib/Grid';

import GlobalNavigation from '/imports/ui/components/globalNavigation';
import PrivateRoute from '/imports/ui/components/privateRoute';
import NotFound from '/imports/ui/components/notFound';

import Index from '/imports/modules/app/components/index';
import Login from '/imports/modules/app/components/login';
import RecoverPassword from '/imports/modules/app/components/recoverPassword';
import ResetPassword from '/imports/modules/app/components/resetPassword';
import Signup from '/imports/modules/app/components/signup';

import Documents from '/imports/modules/documents/components/documents';
import NewDocument from '/imports/modules/documents/components/newDocument';
import ViewDocument from '/imports/modules/documents/components/viewDocument';
import EditDocument from '/imports/modules/documents/components/editDocument';

const App = props => (
  <BrowserRouter>
    {!props.loading ?
      <div className="App">
        <GlobalNavigation {...props} />
        <Grid>
          <Switch>
            <Route exact path="/" component={Index} />
            <PrivateRoute path="/documents/new" component={NewDocument} {...props} />
            <PrivateRoute path="/documents/:_id/edit" component={EditDocument} {...props} />
            <PrivateRoute path="/documents/:_id" component={ViewDocument} {...props} />
            <PrivateRoute path="/documents" component={Documents} {...props} />
            <Route path="/login" component={Login} />
            <Route path="/recover-password" component={RecoverPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div> : ''}
  </BrowserRouter>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
  };
}, App);
