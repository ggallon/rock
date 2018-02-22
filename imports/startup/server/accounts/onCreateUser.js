import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  const userDoc = user;
  const additionals = { profile: Object.create(null) };

  if (!user.emails) {
    userDoc.emails = [];
    // also add services with email defined to user.emails[]
    for (const service in user.services) {
      if (user.services[service].email) {
        const email = {
          address: user.services[service].email,
          verified: true,
        };
        userDoc.emails.push(email);
      }
      if (user.services[service].given_name) {
        additionals.profile.givenName = user.services[service].given_name;
      }
      if (user.services[service].family_name) {
        additionals.profile.familyName = user.services[service].family_name;
      }
      if (user.services[service].picture) {
        additionals.profile.picture = user.services[service].picture;
      }
    }
    // clone before adding roles
    const account = Object.assign(Object.create(null), userDoc, additionals);
    return account;
  }

  userDoc.emails[0].verified = true;
  additionals.profile = Object.assign(Object.create(null), options && options.profile);
  // clone before adding roles
  const account = Object.assign(Object.create(null), userDoc, additionals);
  return account;
});
