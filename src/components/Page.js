import React, {PureComponent} from 'react';
import Calendar from './Calendar';
import EventDetailOverlay from './EventDetailOverlay';
import {filterEventsByDay, getEventFromEvents, getDisplayDate} from '../utils';
import DATA_SET from '../utils/data';

import './Page.css';

const DayNavigator = ({dateDisplay, onPrev, onNext}) => {
    return (
        <nav className="page__nav">
            <button
                className="page__nav-button page__prev-day"
                title="Go to previous day"
                onClick={onPrev}
            />
            <h2 className="page__date">{dateDisplay}</h2>
            <button
                className="page__nav-button page__next-day"
                title="Go to next day"
                onClick={onNext}
            />
        </nav>
    );
};

export default class Page extends PureComponent {
    state = {
        // unfiltered list of events
        events: DATA_SET,

        // The currently selected day represented by numerical timestamp
        day: Date.now(),
        //to handle difference between events passed hour&
        //events on different days
        displayDate:Date.now(),
        // The currently selected event in the agenda
        // (mainly to trigger event detail overlay)
        selectedEventId: undefined,
    }

    _handleSelectEvent(selectedEventId) {
      //opens overlay & close
      this.setState({selectedEventId});

      //adds listener to body to close overlay
      document.body.addEventListener('click', this._handleEventDetailOverlayClose.bind(this))

      //prevents body scroll on small screens
      document.body.classList.add('stop-scroll')
      document.documentElement.classList.add('stop-scroll');
    }


    _handleEventDetailOverlayClose() {
      //closes overlay
      this.setState({selectedEventId: undefined});

      //remove body click listener
      document.body.removeEventListener('click', this._handleEventDetailOverlayClose.bind(this));

      //allows body scroll on small screens again
      document.body.classList.remove('stop-scroll')
      document.documentElement.classList.remove('stop-scroll');
    }

    _handlePrev() {
        // TODO: Update this.state.day to go back 1 day so previous button works
        //
        //COMPLETED
      let timeToSubtract = 60000 * 60 * 24;
      let newDay =this.state.displayDate - timeToSubtract;
      this.setState({displayDate: newDay});
    }

    _handleNext() {
        // TODO: Update this.state.day to go forward 1 day so next button works
        //
        //COMPLETED
        let timeToAdd = 60000 * 60 * 24;
        let newDay =this.state.displayDate + timeToAdd;
        this.setState({displayDate: newDay});

    }

    render() {
        let {events, day, displayDate, selectedEventId, showForm} = this.state;
        let filteredEvents = filterEventsByDay(events, displayDate);
        let selectedEvent = getEventFromEvents(events, selectedEventId);
        let overlay;

        if (selectedEvent) {
            overlay = (
                <EventDetailOverlay
                    event={selectedEvent}
                    onClose={this._handleEventDetailOverlayClose.bind(this)}
                />
            );
        }

        return (
            <div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                </header>
                <DayNavigator
                    dateDisplay={getDisplayDate(displayDate)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
              <Calendar
                events={filteredEvents} onSelectEvent={this._handleSelectEvent.bind(this)}
                currentTime={day}
                displayTime={displayDate}
                />
              {overlay}
            </div>
        );
    }
}
