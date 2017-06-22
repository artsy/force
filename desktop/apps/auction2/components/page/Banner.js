import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'

export default function Banner (props) {
  const {
    auction,
    isLiveOpen,
    liveAuctionUrl
  } = props

  const {
    cover_image,
    name
  } = auction.toJSON()

  const BackgroundBanner = ({ children }) => {
    const imageUrl = get(cover_image, 'cropped.url', '')

    return (
      <div
        className='auction-banner-live-bg'
        style={{ backgroundImage: `url('${imageUrl}')` }}
        alt={name}
      >
        {children}
      </div>
    )
  }

  BackgroundBanner.propTypes = {
    children: PropTypes.node
  }

  return (
    <div>
      {isLiveOpen
        ? <div className='auction-banner auction-banner-live-open'>
          <BackgroundBanner />

          <div className='auction-banner-live-details'>
            <h1>
              Live Bidding Now Open
            </h1>

            <a href={liveAuctionUrl} className='avant-garde-button-white'>
              Enter live auction
            </a>
          </div>
        </div>
        : <div className='auction-banner'>
          <BackgroundBanner>
            <div className='auction-clock white-overlay-clock js-auction-clock'>

              {/*
                Backbone-based view:
                components/clock/index.coffee
              */}
              <div className='clock'>
                <div className='clock-header' />
                <ul className='clock-value' />
              </div>
            </div>
          </BackgroundBanner>
        </div>
      }
    </div>
  )
}

Banner.propTypes = {
  auction: PropTypes.object.isRequired,
  isLiveOpen: PropTypes.bool.isRequired,
  liveAuctionUrl: PropTypes.string
}
