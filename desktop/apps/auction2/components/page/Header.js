import AddToCalendarView from 'desktop/components/add_to_calendar/react'
import PropTypes from 'prop-types'
import React from 'react'
import Registration from './Registration'

export default function Header (props) {
  const { auction } = props
  const showAddToCalendar = !(auction.isClosed() || auction.isLiveOpen())

  return (
    <header className='auction2-header'>
      <div className='auction2-header-primary'>
        { auction.isAuctionPromo() &&
          <h4 className='auction2-sub-header'>
            Sale Preview
          </h4> }

        <h1 className='auction2-title'>
          {auction.get('name')}
        </h1>

        <div className='auction2-callout'>
          {auction.upcomingLabel()}

          { showAddToCalendar &&
            <AddToCalendarView /> }

          {auction.get('live_start_at') &&
            <div className='auction2-callout-live-label'>
              <span className='auction2-live-label'>
                Live auction
              </span>
              <span
                className='auction2-live-tooltip help-tooltip'
                data-message='Participating in a live auction means you’ll be competing against bidders in real time on an auction room floor. You can place max bids which will be represented by Artsy in the auction room or you can bid live when the auction opens.'
                data-anchor='top-left'
              />
            </div> }

        </div>
        <div
          className='auction2-description'
          dangerouslySetInnerHTML={{
            __html: auction.mdToHtml('description')
          }}
        />
      </div>

      <div className='auction2-header-metadata'>
        <Registration {...props} />
      </div>
    </header>
  )
}

Header.propTypes = {
  auction: PropTypes.object.isRequired
}
