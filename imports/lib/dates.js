import moment from 'moment';
import 'moment/locale/fr';
import 'moment-timezone';

moment.locale('fr');

export const monthDayYear = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('MMMM Do, YYYY') :
    moment(timestamp).tz(timezone).format('MMMM Do, YYYY')
);

export const dayMonthYearAtTime = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('Do MMMM YYYY [à] hh:mm') :
    moment(timestamp).tz(timezone).format('Do MMMM YYYY [à] hh:mm')
);

export const timeago = (timestamp, timezone) => (
  !timezone ? moment(timestamp).fromNow() :
    moment(timestamp).tz(timezone).fromNow()
);

export const add = (timestamp, amount, range, timezone) => (
  !timezone ? moment(timestamp).add(amount, range).format() :
    moment(timestamp).tz(timezone).add(amount, range).format()
);

export const year = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('YYYY') :
    moment(timestamp).tz(timezone).format('YYYY')
);
