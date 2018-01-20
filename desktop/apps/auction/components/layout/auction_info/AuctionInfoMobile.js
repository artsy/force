import * as appActions from 'desktop/apps/auction/actions/app'
import InfoIcon from '../../../../../components/main_layout/public/icons/info-2.svg'
import PropTypes from 'prop-types'
import React from 'react'
import Registration from './Registration'
import block from 'bem-cn-lite'
import capitalize from 'underscore.string/capitalize'
import { connect } from 'react-redux'

function AuctionInfoMobile (props) {
  const {
    description,
    isAuctionPromo,
    liveStartAt,
    name,
    showInfoWindow,
    showInfoWindowAction,
    upcomingDateTime,
    upcomingLabel
  } = props

  const b = block('auction-AuctionInfo')

  return (
    <div className={b({ expandToFullScreen: showInfoWindow })}>
      <div className={b('container')}>
        <div className={b('primary')}>

          { showInfoWindow &&
            <div className={b('info-window-controls')}>
              <div className={b('info-window-title')}>
                Auction Information
              </div>
              <div
                onClick={() => showInfoWindowAction(!showInfoWindow)}
                className={b('info-window-close-button')}
              >
                <span className={b.builder()('').mix('icon-close')()} />
              </div>
            </div>
          }

          { liveStartAt &&
            <div className={b('callout-live-label')}>
              <span className={b('live-label')}>
                Live auction
              </span>
            </div> }

          <h1 className={b('title')}>
            {name}
          </h1>

          <div className={b('callout')}>
            {upcomingLabel}
          </div>

          { showInfoWindow &&
            <div>
              <Registration />

              <div
                className={b('description')}
                dangerouslySetInnerHTML={{
                  __html: description
                }}
              />

              <div className={b('date-time')}>
                <div className={b('live-label')}>
                  Auction Begins
                </div>
                <div>
                  {upcomingDateTime}
                </div>
              </div>

              <div>
                <div className='chevron-nav-list'>
                  <a href='/how-auctions-work'>
                    Auctions FAQ
                  </a>
                  <a href='mailto:specialists@artsy.net'>
                    Contact
                  </a>
                </div>
              </div>
            </div> }

          { isAuctionPromo &&
            <h4 className={b('sub-header')}>
              Sale Preview
            </h4> }
        </div>

        <div
          className={b('metadata', { expandToFullScreen: showInfoWindow })}
          onClick={() => showInfoWindowAction(!showInfoWindow)}
        >
          <span className={b('info-button')}>
            <InfoIcon />
          </span>
        </div>
      </div>

      { !showInfoWindow &&
        <Registration /> }
    </div>
  )
}

AuctionInfoMobile.propTypes = {
  description: PropTypes.string.isRequired,
  isAuctionPromo: PropTypes.bool,
  liveStartAt: PropTypes.string,
  name: PropTypes.string.isRequired,
  showInfoWindow: PropTypes.bool.isRequired,
  showInfoWindowAction: PropTypes.func.isRequired,
  upcomingLabel: PropTypes.string.isRequired,
  upcomingDateTime: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const { auction, isEcommerceSale, isMobile, showInfoWindow } = state.app

  let upcomingLabel = auction.upcomingLabel()
  if (isEcommerceSale) {
    upcomingLabel = capitalize(upcomingLabel.replace('Bidding', '').trim())
  }

  return {
    description: auction.mdToHtml('description'),
    isAuctionPromo: auction.isAuctionPromo(),
    isMobile,
    liveStartAt: auction.get('live_start_at'),
    name: auction.get('name'),
    showInfoWindow,
    upcomingLabel,
    upcomingDateTime: auction.upcomingDateTime()
  }
}

const mapDispatchToProps = {
  showInfoWindowAction: (showInfoWindow) => {
    window.scrollTo(0, 0)
    return appActions.showInfoWindow(showInfoWindow)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuctionInfoMobile)

export const test = { AuctionInfoMobile }
