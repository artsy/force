import React, { Component } from 'react'

export default class AddToCalendar extends Component {
  state = {
    showCalendarOptions: true // TODO: Implement when ready for isomorphic
  }

  handleMouseOver = () => {
    this.setState({
      showCalenderOptions: true
    })
  }

  handleMouseOut = () => {
    this.setState({
      showCalenderOptions: false
    })
  }

  render () {
    return (
      <div className='add-to-calendar'>
        <div className='add-to-calendar__wrapper'>
          <a
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
            className='add-to-calendar-event-item-date__add-to-calender'
            href='#'
          >
            + Add to Calendar
          </a>

          <div className='add-to-calendar-event-calendar-wrapper'>
            <div className='add-to-calendar-event-arrow-up' />
            <div className='add-to-calendar-event-calendar-container'>
              <a className='outlook'>
                Outlook
              </a>
              <a className='google'>
                Google
              </a>
              <a className='yahoo'>
                Yahoo!
              </a>
              <a className='ical'>
                iCal
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
