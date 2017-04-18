import React, {PureComponent, PropTypes} from 'react';
import {filterEventsByHour} from '../utils';
import {HOURS_DAY} from '../utils/constants';
import {EVENTS_PROP_TYPE} from './constants';
import TimeSlot from './TimeSlot';

import './Calendar.css';

export default class Calendar extends PureComponent {
    static propTypes = {
        events: EVENTS_PROP_TYPE.isRequired,
        onSelectEvent: PropTypes.func.isRequired,
    }


    //handles logic to see if event has passed
    _checkIfpassed(hour){
      let {currentTime, displayTime} = this.props;
      let currentHour = new Date(currentTime).getHours();

      if (currentTime > displayTime) {
        return true;
      } else if(currentTime < displayTime){
        return false;
      } else if (currentHour >= hour){
        return true;
      } else {
        return false;
      }
    }

    _renderTimeSlots() {
        let {events, onSelectEvent} = this.props;


        return new Array(HOURS_DAY)
            .fill(0)
            .map((item, index) => {
                let hour = index;
                let filteredEvents = filterEventsByHour(events, hour);
                let hasPassed = this._checkIfpassed(hour)

                return (
                    <TimeSlot
                        key={hour}
                        hour={hour}
                        events={filteredEvents}
                        onSelectEvent={onSelectEvent}
                        hasPassed={hasPassed}
                    />
                )
            });
    }

    render() {
        return (
            <main className="calendar">
                {this._renderTimeSlots()}
            </main>
        );
    }
}
