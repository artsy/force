import AddToCalendarView from 'desktop/components/add_to_calendar/react'
import PropTypes from 'prop-types'
import React from 'react'
import Registration from './Registration'
import { connect } from 'react-redux'

function Header (props) {
  const {
    description,
    isAuctionPromo,
    liveStartAt,
    name,
    showAddToCalendar,
    upcomingLabel
  } = props

  return (
    <header className='auction2-header'>
      <div className='auction2-header-primary'>
        { isAuctionPromo &&
          <h4 className='auction2-sub-header'>
            Sale Preview
          </h4> }

        <h1 className='auction2-title'>
          {name}
        </h1>

        <div className='auction2-callout'>
          {upcomingLabel}

          { showAddToCalendar &&
            <AddToCalendarView /> }

          { liveStartAt &&
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
            __html: description
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
  description: PropTypes.string.isRequired,
  isAuctionPromo: PropTypes.bool,
  liveStartAt: PropTypes.object,
  name: PropTypes.string.isRequired,
  showAddToCalendar: PropTypes.bool.isRequired,
  upcomingLabel: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const { auction } = state.app

  return {
    description: auction.mdToHtml('description'),
    isAuctionPromo: auction.isAuctionPromo(),
    liveStartAt: auction.get('live_start_at'),
    name: auction.get('name'),
    showAddToCalendar: !(auction.isClosed() || auction.isLiveOpen()),
    upcomingLabel: auction.upcomingLabel()
  }
}

export default connect(
  mapStateToProps
)(Header)
