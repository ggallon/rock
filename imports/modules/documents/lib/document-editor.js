/* eslint-disable no-undef */
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertDocument } from '/imports/api/documents/methods';
import '/imports/lib/validation';

let component;

const handleUpsert = () => {
  const { doc, history } = component.props;
  const confirmation = doc && doc._id ? 'Document mise à jour !' : 'Document ajouté !';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    body: document.querySelector('[name="body"]').value.trim(),
  };

  if (doc && doc._id) upsert._id = doc._id;

  upsertDocument.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.documentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      history.push(`/documents/${response.insertedId || doc._id}`);
    }
  });
};

const validate = () => {
  $(component.documentEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Le titre est requis',
      },
      body: {
        required: 'Le corp est requis',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function documentEditor(options) {
  component = options.component;
  validate();
}
