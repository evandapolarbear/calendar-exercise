/**
* Given a numerical timestamp, returns the formatted date string w/o time component
* @param {number} timestamp - The date to format
* @returns {string} The formatted date
*/
export const getDisplayDate = (timestamp) => {
  // TODO: Format the date like: "Tuesday, April 11, 2017"
  // COMPLETED
  let date = new Date(timestamp);



  let dateNum = date.getDate();
  let month = date.getMonth();
  let day = date.getDay();
  let year = date.getFullYear();

  let dayConvert = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]
  let monthConvert = ["January", "Febuary", "March", "April", "August", "September", "November", "December"
  ]


  return dayConvert[day] + ', ' + monthConvert[month] + ' ' + dateNum + ', ' + year;
};

/**
 * Given a list of events and a date, filter the events down to those that
 * fall on the same day as the date
 * @param {array} events - List of event objects
 * @param {Date} timestamp - The timestamp representing the day to match
 * @returns {array}
 */
export const filterEventsByDay = (events, timestamp) => {
    // TODO: Implement day filtering!
    //completed

    let currentDate = getDisplayDate(timestamp);

    let todaysEvents = events.filter(event => {
      let eventDate = getDisplayDate(event.start);
      return eventDate === currentDate;
    });

    return todaysEvents;
}

/**
 * Given a list of events and an hour number, filter the events down to those that
 * start on the specified hour
 * @param {array} events - List of event objects
 * @param {number} hour - The hour to match (0 - 23)
 * @param {array}
 * @returns {array}
 */
export const filterEventsByHour = (events, hour) => (
    events.filter(({start}) => (
        new Date(start)).getHours() === hour
    )
);



/**
 * Given an hour number, returns a display string version
 * @param {number} hour - The hour
 * @returns {string}
 */
// TODO: Implement using a more programmatic approach instead of map
// COMPLETED

export const getDisplayHour = (hour) => {
  let amPm = hour > 11 ? "PM" : "AM";
  let time = hour % 12 === 0 ? 12 : hour % 12;
  let timeSig = time + amPm

  return timeSig;
}
/**
 * Given a list of events, returns the event object whose id matches the specified eventId
 * @param {array} events - List of event objects
 * @param {number} eventId - ID of event to find
 * @returns {object}
 */
export const getEventFromEvents = (events, eventId) => (
    events.find(({id}) => id === eventId)
)
