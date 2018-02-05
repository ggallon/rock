import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import LoadableWrapper from '../components/loadableWrapper';

import GlobalNavigation from '../components/globalNavigation';
import PublicRoute from '../components/publicRoute';
import PrivateRoute from '../components/privateRoute';
import NotFound from '../components/notFound';

const Index = LoadableWrapper({ loader: () => import('../../modules/app/components/index') });
const Login = LoadableWrapper({ loader: () => import('../../modules/app/components/login') });
const RecoverPassword = LoadableWrapper({ loader: () => import('../../modules/app/components/recoverPassword') });
const ResetPassword = LoadableWrapper({ loader: () => import('../../modules/app/components/resetPassword') });
const Signup = LoadableWrapper({ loader: () => import('../../modules/app/components/signup') });

const Quotes = LoadableWrapper({ loader: () => import('../../modules/quotes/components/quotes') });
const NewQuote = LoadableWrapper({ loader: () => import('../../modules/quotes/components/newQuote') });
const ViewQuote = LoadableWrapper({ loader: () => import('../../modules/quotes/components/viewQuote') });
const EditQuote = LoadableWrapper({ loader: () => import('../../modules/quotes/components/editQuote') });

const Users = LoadableWrapper({ loader: () => import('../../modules/users/components/users') });
const NewUser = LoadableWrapper({ loader: () => import('../../modules/users/components/newUser') });
const ViewUser = LoadableWrapper({ loader: () => import('../../modules/users/components/viewUser') });
const EditUser = LoadableWrapper({ loader: () => import('../../modules/users/components/editUser') });

const App = props => (
  <BrowserRouter>
    {!props.loading ?
      <div className="App">
        <GlobalNavigation {...props} />
        <Grid>
          <Switch>
            <PrivateRoute exact path="/" component={Index} {...props} />
            <PrivateRoute path="/quotes/new" component={NewQuote} {...props} />
            <PrivateRoute path="/quotes/:_id/edit" component={EditQuote} {...props} />
            <PrivateRoute path="/quotes/:_id" component={ViewQuote} {...props} />
            <PrivateRoute path="/quotes" component={Quotes} {...props} />
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
