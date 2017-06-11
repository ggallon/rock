import SimpleSchema from 'simpl-schema';
import '/imports/lib/simple_schema_message_box_fr';

const documentSchema = new SimpleSchema({
  title: {
    label: 'Titre',
    type: String,
    uniforms: {
      placeholder: 'Titre',
    },
  },
  body: {
    label: 'Contenu',
    type: String,
    uniforms: {
      placeholder: 'Contenu',
    },
  },
});

export default documentSchema;
