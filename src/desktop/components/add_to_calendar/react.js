import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AddToCalendarView from 'desktop/components/add_to_calendar/index.coffee'

export default class AddToCalendar extends Component {
  static propTypes = {
    el: PropTypes.node,
    event: PropTypes.object.isRequired,
  }

  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.$ = require('jquery')

    this.setState(() => {
      this.view = new AddToCalendarView({
        el: this.props.el || this.$('.add-to-calendar'),
      })

      return {
        isMounted: true,
      }
    })
  }

  componentWillUnmount() {
    this.view.remove()
  }

  render() {
    const { event } = this.props

    return (
      <div className="add-to-calendar">
        <div className="add-to-calendar__wrapper">
          <a
            className="add-to-calendar-event-item-date__add-to-calender"
            href="#"
          >
            + Add to Calendar
          </a>

          {this.state.isMounted && (
            <div className="add-to-calendar-event-calendar-wrapper">
              <div className="add-to-calendar-event-arrow-up" />
              <div className="add-to-calendar-event-calendar-container">
                <a className="outlook" href={event.icsCalendarUrl()}>
                  Outlook
                </a>
                <a
                  className="google"
                  href={event.googleCalendarUrl()}
                  target="_blank"
                >
                  Google
                </a>
                <a
                  className="yahoo"
                  href={event.yahooCalendarUrl()}
                  target="_blank"
                >
                  Yahoo!
                </a>
                <a className="ical" href={event.icsCalendarUrl()}>
                  iCal
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
