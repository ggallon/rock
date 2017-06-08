import SimpleSchema from 'simpl-schema';

const RecoverPasswordSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
    uniforms: {
      type: 'email',
      placeholder: 'Veuillez saisir votre identifiant (e-mail)',
    },
  },
});

export default RecoverPasswordSchema;
