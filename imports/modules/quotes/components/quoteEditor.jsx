import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import SubmitField from 'uniforms-bootstrap3/SubmitField';
import QuoteSchema from '../lib/quoteSchema';

class QuoteEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteEditorError: null,
      model: this.props.quote || {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      document.querySelector('[name="title"]').focus();
    }, 0);
  }

  onChange() {
    this.setState({ quoteEditorError: null });
  }

  onSubmit(formData) {
    console.log(formData);
    const { quote } = this.props;
    const methodToCall = quote && quote._id ? 'quotes.update' : 'quotes.insert';
    return new Promise((resolve, reject) =>
      Meteor.call(methodToCall, formData, (error, response) =>
        (error ? reject(error) : resolve(response))));
  }

  onSubmitFailure(error) {
    this.setState({ quoteEditorError: error });
  }

  onSubmitSuccess(response) {
    const { quote, history } = this.props;
    history.push(`/quotes/${response || quote._id}`);
  }

  render() {
    const { quote } = this.props;
    const CustomSubmitField = () => (
      <SubmitField
        value={quote && quote._id ? 'Enregistrer' : 'Nouveau'}
        className="pull-right"
      />);

    return (
      <AutoForm
        schema={QuoteSchema}
        placeholder
        error={this.state.quoteEditorError}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onSubmitFailure={this.onSubmitFailure}
        onSubmitSuccess={this.onSubmitSuccess}
        model={this.state.model}
        submitField={CustomSubmitField}
      />
    );
  }
}

QuoteEditor.defaultProps = {
  quote: null,
};

QuoteEditor.propTypes = {
  quote: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withRouter(QuoteEditor);
