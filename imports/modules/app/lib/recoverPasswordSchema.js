import SimpleSchema from 'simpl-schema';
import '/imports/lib/simple_schema_message_box_fr';

const RecoverPasswordSchema = new SimpleSchema({
  email: {
    label: 'E-mail',
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
    uniforms: {
      type: 'email',
      placeholder: 'Veuillez saisir votre identifiant (e-mail)',
    },
  },
});

export default RecoverPasswordSchema;
