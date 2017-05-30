import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

// Render the Calendar
const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

const Calendar = () => (
  <div className="Calendar">
    <Row>
      <Col xs={12}>
        <div className="page-header clearfix">
          <h4 className="pull-left">Calendrier</h4>
        </div>
        <InfiniteCalendar
          locale={{
            locale: require('date-fns/locale/fr'),
            weekStartsOn: 1,
            headerFormat: 'dddd, D MMM',
            weekdays: ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],
            blank: 'Aucune date selectionnée',
            todayLabel: {
              long: 'Aujourd\'hui',
              short: 'Auj.'
            }
          }}
          width={1170}
          height={300}
          selected={today}
          disabledDays={[0,6]}
          minDate={lastWeek}
        />
      </Col>
    </Row>
  </div>
);

export default Calendar;
