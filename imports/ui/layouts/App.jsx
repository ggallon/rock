/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import { Grid } from 'react-bootstrap';
import Grid from 'react-bootstrap/lib/Grid';
import PrivateRoute from '/imports/lib/private-route';
import AppNavigation from '/imports/ui/components/AppNavigation';

import Index from '/imports/modules/app/components/Index';

import Documents from '/imports/modules/documents/components/Documents';
import NewDocument from '/imports/modules/documents/components/NewDocument';
import ViewDocument from '/imports/modules/documents/components/ViewDocument';
import EditDocument from '/imports/modules/documents/components/EditDocument';

import Calendar from '/imports/modules/calendar/components/calendar';

import Login from '/imports/modules/app/components/Login';
import RecoverPassword from '/imports/modules/app/components/RecoverPassword';
import ResetPassword from '/imports/modules/app/components/ResetPassword';
import Signup from '/imports/modules/app/components/Signup';

import NotFound from '/imports/ui/components/notFound';

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
          <PrivateRoute path="/calendar" component={Calendar} />
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
