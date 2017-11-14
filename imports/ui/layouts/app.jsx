import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';

import GlobalNavigation from '/imports/ui/components/globalNavigation';
import PublicRoute from '/imports/ui/components/publicRoute';
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

import Users from '/imports/modules/app/components/users';
import NewUser from '/imports/modules/app/components/newUser';
import ViewUser from '/imports/modules/app/components/viewUser';
import EditUser from '/imports/modules/app/components/editUser';

const App = props => (
  <BrowserRouter>
    {!props.loading ?
      <div className="App">
        <GlobalNavigation {...props} />
        <Grid>
          <Switch>
            <PrivateRoute exact path="/" component={Index} {...props} />
            <PrivateRoute path="/documents/new" component={NewDocument} {...props} />
            <PrivateRoute path="/documents/:_id/edit" component={EditDocument} {...props} />
            <PrivateRoute path="/documents/:_id" component={ViewDocument} {...props} />
            <PrivateRoute path="/documents" component={Documents} {...props} />
            <PrivateRoute path="/users/new" component={NewUser} {...props} />
            <PrivateRoute path="/users/:_id/edit" component={EditUser} {...props} />
            <PrivateRoute path="/users/:_id" component={ViewUser} {...props} />
            <PrivateRoute path="/users" component={Users} {...props} />
            <PublicRoute path="/login" component={Login} {...props} />
            <PublicRoute path="/recover-password" component={RecoverPassword} {...props} />
            <PublicRoute path="/reset-password/:token" component={ResetPassword} {...props} />
            <PublicRoute path="/signup" component={Signup} {...props} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div> : ''}
  </BrowserRouter>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default App;
