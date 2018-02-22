import moment from 'moment';
import 'moment/locale/fr';
import 'moment-timezone';

moment.locale('fr');

export const dayMonthYear = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('Do MMMM YYYY') :
    moment(timestamp).tz(timezone).format('Do MMMM YYYY')
);

export const dayMonthYearAtTime = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('Do MMMM YYYY [à] HH:mm') :
    moment(timestamp).tz(timezone).format('Do MMMM YYYY [à] HH:mm')
);

export const timeago = (timestamp, timezone) => (
  !timezone ? moment(timestamp).fromNow() :
    moment(timestamp).tz(timezone).fromNow()
);

export const add = (timestamp, amount, range, timezone) => (
  !timezone ? moment(timestamp).add(amount, range).format() :
    moment(timestamp).tz(timezone).add(amount, range).format()
);

export const today = (timezone) => (
  !timezone ? moment() : moment().tz(timezone)
);

export const year = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('YYYY') :
    moment(timestamp).tz(timezone).format('YYYY')
);
