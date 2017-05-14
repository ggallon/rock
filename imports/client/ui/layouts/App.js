/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import PrivateRoute from '/imports/modules/private-route';
import AppNavigation from '/imports/client/ui/components/AppNavigation';
import EditDocument from '/imports/client/ui/pages/EditDocument';
import ViewDocument from '/imports/client/ui/pages/ViewDocument';
import Documents from '/imports/client/ui/pages/Documents';
import NewDocument from '/imports/client/ui/pages/NewDocument';
import Index from '/imports/client/ui/pages/Index';
import Login from '/imports/client/ui/pages/Login';
import NotFound from '/imports/client/ui/pages/NotFound';
import RecoverPassword from '/imports/client/ui/pages/RecoverPassword';
import ResetPassword from '/imports/client/ui/pages/ResetPassword';
import Signup from '/imports/client/ui/pages/Signup';

const App = () => (
  <BrowserRouter>
    <div>
      <AppNavigation />
      <Grid>
        <Switch>
          <Route exact path="/" component={Index} />
          <PrivateRoute path="/documents/new" component={NewDocument} />
          <PrivateRoute path="/documents/:_id/edit" component={EditDocument} />
          <PrivateRoute path="/documents/:_id" component={ViewDocument} />
          <PrivateRoute path="/documents" component={Documents} />
          <Route path="/login" component={Login} />
          <Route path="/recover-password" component={RecoverPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </div>
  </BrowserRouter>
);

export default App;
