import { Accounts } from 'meteor/accounts-base';

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true,
  restrictCreationByEmailDomain: '',
  loginExpirationInDays: 7,
  passwordResetTokenExpirationInDays: 0.5,
  passwordEnrollTokenExpirationInDays: 1,
  ambiguousErrorMessages: true,
});

