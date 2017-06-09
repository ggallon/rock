import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import AutoField from 'uniforms-bootstrap3/AutoField';
import AutoFields from 'uniforms-bootstrap3/AutoFields';
import ErrorsField from 'uniforms-bootstrap3/ErrorsField';
import { SubmitField } from 'uniforms-bootstrap3';
import SignupSchema from '/imports/modules/app/lib/signupSchema';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      signupError: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  onChange() {
    this.setState({ signupError: null });
  }

  onSubmit({ identfiant, password }) {
    return new Promise((resolve, reject) =>
      Accounts.createUser(user, error =>
        error ? reject(error) : resolve(),
      ),
    );
  }

  onSubmitFailure(error) {
    this.setState({ signupError: error });
  }

  onSubmitSuccess() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
     return (
      <div className="Signup">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="center-block">
            <h4 className="page-header">Créer votre identifiant</h4>
            <p>Vous avez déjà un identifiant ? <Link to="/recover-password">Retrouvez-le ici</Link></p>
            <AutoForm
              schema={SignupSchema}
              placeholder
              error={this.state.signupError}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onSubmitFailure={this.onSubmitFailure}
              onSubmitSuccess={this.onSubmitSuccess}
            >
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <AutoField name='fisrtName' />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <AutoField name='lastName' />
                </Col>
              </Row>
              <AutoField name='identifiant' help='Cette adresse e-mail sera votre identifiant.' />
              <AutoFields fields={['password', 'repeatPassword']} />
              <ErrorsField />
              <SubmitField value="Confirmer" className="pull-right" />
            </AutoForm>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Signup);
