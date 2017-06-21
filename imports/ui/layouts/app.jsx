import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';

import PrivateRoute from '/imports/lib/private-route';
import AppNavigation from '/imports/ui/components/appNavigation';

import Index from '/imports/modules/app/components/index';

import Documents from '/imports/modules/documents/components/documents';
import NewDocument from '/imports/modules/documents/components/newDocument';
import ViewDocument from '/imports/modules/documents/components/viewDocument';
import EditDocument from '/imports/modules/documents/components/editDocument';

import Login from '/imports/modules/app/components/login';
import RecoverPassword from '/imports/modules/app/components/recoverPassword';
import ResetPassword from '/imports/modules/app/components/resetPassword';
import Signup from '/imports/modules/app/components/signup';

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
