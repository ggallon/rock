import { compose } from '@ggallon/react-komposer';
import getTrackerLoader from './get-tracker-loader';

export default function container(composer, Component, options = Object.create(null)) {
  return compose(getTrackerLoader(composer), options)(Component);
}
