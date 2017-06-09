import SimpleSchema from 'simpl-schema';
import '/imports/lib/simple_schema_message_box_fr';

const LoginSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
    uniforms: {
      type: 'email',
      placeholder: 'Identifiant',
    },
  },
  password: {
    type: String,
    uniforms: {
      type: 'password',
      placeholder: 'Mot de passe',
    },
  },
});

export default LoginSchema;
