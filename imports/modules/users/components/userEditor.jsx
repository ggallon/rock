import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import AutoField from 'uniforms-bootstrap3/AutoField';
import AutoFields from 'uniforms-bootstrap3/AutoFields';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import UserSchema from '../../../api/users/userSchema';

const userTransform = user => ({
  _id: user._id,
  givenName: user.profile.givenName,
  familyName: user.profile.familyName,
  identifiant: user.emails[0].address,
});

class UserEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEditorError: null,
      userUpdate: !!this.props.user && !!this.props.user._id,
      model: this.props.user ? userTransform(this.props.user) : Object.create(null),
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      document.querySelector('[name="givenName"]').focus();
    }, 0);
  }

  onChange() {
    this.setState({ userEditorError: null });
  }

  onSubmit(formData) {
    const methodToCall = this.state.userUpdate ? 'users.update' : 'users.insert';
    return new Promise((resolve, reject) =>
      Meteor.call(methodToCall, formData, (error, response) =>
        (error ? reject(error) : resolve(response))));
  }

  onSubmitFailure(error) {
    this.setState({ userEditorError: error });
  }

  onSubmitSuccess(response) {
    const { user, history } = this.props;
    history.push(`/users/${response || user._id}`);
  }

  render() {
    let UserSchemaForm = UserSchema;

    if (this.state.userUpdate) {
      UserSchemaForm = UserSchema.omit('password', 'repeatPassword');
    }

    const CustomSubmitField = () => (
      <SubmitField
        value={this.state.userUpdate ? 'Enregistrer' : 'Nouveau'}
        className="pull-right"
      />);

    return (
      <div className="userEditor">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <AutoForm
              error={this.state.userEditorError}
              model={this.state.model}
              modelTransform={(mode, model) => {
                if (mode === 'submit' && !this.state.userUpdate) {
                  return _.omit(model, 'repeatPassword');
                }
                return model;
              }}
              onChange={this.onChange}
              onSubmitFailure={this.onSubmitFailure}
              onSubmitSuccess={this.onSubmitSuccess}
              onSubmit={this.onSubmit}
              placeholder
              schema={UserSchemaForm}
              submitField={CustomSubmitField}
            >
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <AutoField name="givenName" />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <AutoField name="familyName" />
                </Col>
              </Row>
              <AutoField name="identifiant" help="Cette adresse e-mail sera son identifiant." />
              {this.state.userUpdate ? '' : <AutoFields fields={['password', 'repeatPassword']} />}
              <ErrorsField />
              <CustomSubmitField />
            </AutoForm>
          </Col>
        </Row>
      </div>
    );
  }
}

UserEditor.defaultProps = {
  user: null,
};

UserEditor.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withRouter(UserEditor);
