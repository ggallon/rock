import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const externalServices = Meteor.settings.private.externalServices;

if (externalServices) {
  Object.keys(externalServices).forEach((service) => {
    ServiceConfiguration.configurations.upsert(
      { service },
      { $set: externalServices[service] },
    );
  });
}
