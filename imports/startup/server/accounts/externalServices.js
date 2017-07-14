import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const externalServices = Meteor.settings.private.externalServices;

if (externalServices) {
  Object.keys(externalServices).forEach((service) => {
    if (externalServices[service].clientId !== '' || externalServices[service].secret !== '') {
      ServiceConfiguration.configurations.upsert(
        { service },
        { $set: externalServices[service] },
      );
    }
  });
}
