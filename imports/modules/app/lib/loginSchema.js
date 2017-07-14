import SimpleSchema from 'simpl-schema';
import '/imports/lib/simple_schema_message_box_fr';

const LoginSchema = new SimpleSchema({
  identifiant: {
    label: 'Identifiant',
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
    uniforms: {
      type: 'email',
      placeholder: 'Identifiant',
    },
  },
  password: {
    label: 'Mot de passe',
    type: String,
    uniforms: {
      type: 'password',
      placeholder: 'Mot de passe',
    },
  },
});

export default LoginSchema;
