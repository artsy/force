import AddToCalendar from 'desktop/components/add_to_calendar/index.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import Registration from './registration'

export default function Header (props) {
  const { auction } = props
  const showAddToCalendar = !(auction.isClosed() || auction.isLiveOpen())

  return (
    <header className='auction-header'>
      <div className='auction-header-primary'>
        { auction.isAuctionPromo() &&
          <h4 className='auction-sub-header'>
            Sale Preview
          </h4> }

        <h1 className='auction-title'>
          {auction.get('name')}
        </h1>

        <div className='auction-callout'>
          {auction.upcomingLabel()}

          { showAddToCalendar &&
            <AddToCalendar /> }

          {auction.get('live_start_at') &&
            <div className='auction-callout-live-label'>
              <span className='auction-live-label'>
                Live auction
              </span>
              <span
                className='auction-live-tooltip help-tooltip'
                data-message='Participating in a live auction means you’ll be competing against bidders in real time on an auction room floor. You can place max bids which will be represented by Artsy in the auction room or you can bid live when the auction opens.'
                data-anchor='top-left'
              />
            </div> }

        </div>
        <div className='auction-description'>
          <div dangerouslySetInnerHTML={{
            __html: auction.mdToHtml('description')
          }} />
        </div>
      </div>

      <div className='auction-header-metadata'>
        <Registration />
      </div>
    </header>
  )
}

Header.propTypes = {
  auction: PropTypes.object.isRequired
}
