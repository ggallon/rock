import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';

import GlobalNavigation from '../components/globalNavigation';
import PublicRoute from '../components/publicRoute';
import PrivateRoute from '../components/privateRoute';
import NotFound from '../components/notFound';

import Index from '../../modules/app/components/index';
import Login from '../../modules/app/components/login';
import RecoverPassword from '../../modules/app/components/recoverPassword';
import ResetPassword from '../../modules/app/components/resetPassword';
import Signup from '../../modules/app/components/signup';

import Documents from '../../modules/documents/components/documents';
import NewDocument from '../../modules/documents/components/newDocument';
import ViewDocument from '../../modules/documents/components/viewDocument';
import EditDocument from '../../modules/documents/components/editDocument';

import Users from '../../modules/users/components/users';
import NewUser from '../../modules/users/components/newUser';
import ViewUser from '../../modules/users/components/viewUser';
import EditUser from '../../modules/users/components/editUser';

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
