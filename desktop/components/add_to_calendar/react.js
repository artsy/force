import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AddToCalendarView from 'desktop/components/add_to_calendar/index.coffee'

export default class AddToCalendar extends Component {
  static propTypes = {
    el: PropTypes.node
  }

  componentDidMount () {
    this.$ = require('jquery')

    this.view = new AddToCalendarView({
      el: this.props.el || this.$('.auction2-auction-info__callout')
    })
  }

  componentWillUnmount () {
    this.view.remove()
  }

  render () {
    return (
      <div className='add-to-calendar'>
        <div className='add-to-calendar__wrapper'>
          <a
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
