import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentDidMount() {
      let overlay = document.getElementsByClassName('event-detail-overlay').item(0);
      let close = document.getElementsByClassName('event-detail-overlay__close').item(0);

      close.addEventListener('click', e => {
        this.props.onClose();
      })

      overlay.addEventListener('click', e => {
        e.stopPropagation();
      });

      document.body.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
          this.props.onClose();
        }
      })
    }

    render() {
        let {event} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour)
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`

        // TODO: The event label color should match the event color
        // COMPLETED

        // TODO: Add appropriate ARIA tags to overlay/dialog
        //
        // TODO: Support clicking outside of the overlay to close it
        // COMPLETED
        // TODO: Support clicking ESC to close it
        // COMPLETED
        return (
            <section className="event-detail-overlay">
                <div className="event-detail-overlay__container">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className={`event-detail-overlay__color time-slot-event--${color}`}
                            title={`Event label color: ${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}
