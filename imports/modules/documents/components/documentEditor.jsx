import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import { SubmitField } from 'uniforms-bootstrap3';
import { Meteor } from 'meteor/meteor';
import DocumentSchema from '/imports/modules/documents/lib/documentSchema';

class DocumentEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentEditorError: null,
      model: this.props.doc || {},
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
    this.setState({ documentEditorError: null });
  }

  onSubmit(formData) {
    const { doc } = this.props;
    const methodToCall = doc && doc._id ? 'documents.update' : 'documents.insert';
    return new Promise((resolve, reject) =>
      Meteor.call(methodToCall, formData, (error, response) =>
        error ? reject(error) : resolve(response),
      ),
    );
  }

  onSubmitFailure(error) {
    this.setState({ documentEditorError: error });
  }

  onSubmitSuccess(response) {
    const { doc, history } = this.props;
    history.push(`/documents/${response || doc._id}`);
  }

  render() {
    const { doc } = this.props;
    const CustomSubmitField = () => (
      <SubmitField
        value={doc && doc._id ? 'Enregistrer' : 'Nouveau'}
        className="pull-right"
      />);

    return (
      <AutoForm
        schema={DocumentSchema}
        placeholder
        error={this.state.documentEditorError}
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

DocumentEditor.defaultProps = {
  history: null,
  doc: null,
};

DocumentEditor.propTypes = {
  history: PropTypes.object,
  doc: PropTypes.object,
};

export default withRouter(DocumentEditor);
