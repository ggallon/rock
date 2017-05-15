import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Bert } from 'meteor/themeteorchef:bert';

// Imports Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bert settings
Bert.defaults = {
  hideDelay: 7000,
  style: 'growl-top-right',
  type: 'default',
};

import App from '/imports/ui/layouts/App';

Meteor.startup(() => {
  render(
    <App />,
    document.getElementById('react-root'),
  );
});
