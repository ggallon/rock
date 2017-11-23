import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Alert from 'react-bootstrap/lib/Alert';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import container from '../../../lib/container';
import getUserName from '../../../lib/getUserName';
import Loading from '../../../ui/components/loading';
import NotFound from '../../../ui/components/notFound';

class ViewUser extends Component {
  constructor() {
    super();

    this.state = { handleRemoveError: null };

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(_id, history) {
    if (confirm('Êtes-vous sûr ? Ceci est définitif !')) {
      Meteor.call('users.remove', { _id }, (error) => {
        if (error) {
          this.setState({ handleRemoveError: error.reason });
        } else {
          history.push('/users');
        }
      });
    }
  }

  render() {
    const { user, history, match } = this.props;

    return (
      user ? (
        <div className="ViewUser">
          {this.state.handleRemoveError ? (
            <Alert bsStyle="danger">
              {this.state.handleRemoveError}
            </Alert>
          ) : ''}
          <div className="page-header clearfix">
            <h4 className="pull-left">{ user && user.profile && getUserName(user.profile) }</h4>
            <ButtonToolbar className="pull-right">
              <ButtonGroup bsSize="small">
                <Button onClick={() => history.push(`${match.url}/edit`)}>Modifier</Button>
                <Button onClick={() => this.handleRemove(user._id, history)} className="text-danger">Supprimer</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          <div>
            <p>{user._id}</p>
            <p>{user.emails[0].address}</p>
          </div>
        </div>
      ) : <NotFound />
    );
  }
}

ViewUser.propTypes = {
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default container(({ match }, onData) => {
  const userId = match.params._id;
  const subscription = Meteor.subscribe('users.view', userId);

  if (subscription.ready()) {
    const user = Meteor.users.findOne({ _id: userId });
    onData(null, { user });
  }
}, ViewUser, { loadingHandler: () => <Loading /> });
