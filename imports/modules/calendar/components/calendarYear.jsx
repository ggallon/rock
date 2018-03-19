import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'react-yearly-calendar';
import { today } from '../../../lib/dates';

class CalendarYear extends Component {
  constructor() {
    super();

    this.state = {
      year: today('Europe/Paris').year(),
      firstDayOfWeek: 0 // Monday
    };

    this.onDatePicked = this.onDatePicked.bind(this);
  }

  onDatePicked(date) {
    alert(date);
  }

  render() {
    const { year, firstDayOfWeek } = this.state;

    return (
      <div>
        <div id="calendar">
          <Calendar
            year={year}
            onPickDate={this.onDatePicked}
            firstDayOfWeek={firstDayOfWeek}
          />
        </div>
      </div>
    );
  }
}

export default CalendarYear;
