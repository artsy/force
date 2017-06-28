import AddToCalendarView from 'desktop/components/add_to_calendar/react'
import PropTypes from 'prop-types'
import React from 'react'
import Registration from './Registration'
import block from 'bem-cn'
import { connect } from 'react-redux'

function HeaderMobile (props) {
  const {
    description,
    isAuctionPromo,
    liveStartAt,
    name,
    showAddToCalendar,
    upcomingLabel
  } = props

  const b = block('auction2-header')

  return (
    <header className={b()}>
      <div className={b('primary')}>

        { true /*liveStartAt*/ &&
          <div className={b('callout-live-label')}>
            <span className={b('live-label')}>
              Live auction
            </span>

            {/* <span
              className={b('live-tooltip').mix('help-tooltip')}
              data-message='Participating in a live auction means you’ll be competing against bidders in real time on an auction room floor. You can place max bids which will be represented by Artsy in the auction room or you can bid live when the auction opens.'
              data-anchor='top-left'
            /> */}

          </div> }

        <h1 className={b('title')}>
          {name}
        </h1>

        <div className={b('callout')}>
          {upcomingLabel}
{/*
          { showAddToCalendar &&
            <AddToCalendarView /> } */}

        </div>

        { isAuctionPromo &&
          <h4 className={b('sub-header')}>
            Sale Preview
          </h4> }

        {/* <div
          className={b('description')}
          dangerouslySetInnerHTML={{
            __html: description
          }}
        /> */}

      </div>

      <div className={b('metadata')}>
        <span
          className={b('info-button').mix('icon-info-filled')}
        />

        {/* <Registration {...props} /> */}
      </div>
    </header>
  )
}

HeaderMobile.propTypes = {
  description: PropTypes.string.isRequired,
  isAuctionPromo: PropTypes.bool,
  liveStartAt: PropTypes.string,
  name: PropTypes.string.isRequired,
  showAddToCalendar: PropTypes.bool.isRequired,
  upcomingLabel: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const { auction, isMobile } = state.app

  return {
    description: auction.mdToHtml('description'),
    isAuctionPromo: auction.isAuctionPromo(),
    isMobile,
    liveStartAt: auction.get('live_start_at'),
    name: auction.get('name'),
    showAddToCalendar: !(auction.isClosed() || auction.isLiveOpen()),
    upcomingLabel: auction.upcomingLabel()
  }
}

export default connect(
  mapStateToProps
)(HeaderMobile)
