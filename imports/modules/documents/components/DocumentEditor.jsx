/* eslint-disable max-len, no-return-assign */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import documentEditor from '../lib/document-editor';

class DocumentEditor extends Component {
  componentDidMount() {
    documentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  render() {
    const { doc } = this.props;

    return (
      <form
        ref={form => (this.documentEditorForm = form)}
        onSubmit={event => event.preventDefault()}
      >
        <FormGroup>
          <ControlLabel>Titre</ControlLabel>
          <FormControl
            type="text"
            name="title"
            defaultValue={doc && doc.title}
            placeholder="Oh, les lieu où vous irez!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Corp</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="body"
            defaultValue={doc && doc.body}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {doc && doc._id ? 'Enregistrer' : 'Nouveau'}
        </Button>
      </form>
    );
  }
}

DocumentEditor.defaultProps = {
  doc: null,
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
};

export default withRouter(DocumentEditor);
