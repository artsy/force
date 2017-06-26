import ClockView from 'desktop/components/clock/react'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'

function Banner (props) {
  const {
    BackgroundBanner,
    auction,
    isLiveOpen,
    liveAuctionUrl
  } = props

  return (
    <div>
      {isLiveOpen
        ? <div className='auction2-banner auction2-banner-live-open'>
          <BackgroundBanner />

          <div className='auction2-banner-live-details'>
            <h1>
              Live Bidding Now Open
            </h1>

            <a href={liveAuctionUrl} className='avant-garde-button-white'>
              Enter live auction
            </a>
          </div>
        </div>
        : <div className='auction2-banner'>
          <BackgroundBanner>
            <ClockView
              model={auction}
            />
          </BackgroundBanner>
        </div>
      }
    </div>
  )
}

Banner.propTypes = {
  BackgroundBanner: PropTypes.func.isRequired,
  auction: PropTypes.object.isRequired,
  isLiveOpen: PropTypes.bool.isRequired,
  liveAuctionUrl: PropTypes.string
}

const mapStateToProps = (state) => {
  const {
    auction,
    isLiveOpen,
    liveAuctionUrl
  } = state.app

  const { cover_image, name } = auction.toJSON()

  const BackgroundBanner = ({ children }) => {
    const imageUrl = get(cover_image, 'cropped.url', '')

    return (
      <div
        className='auction2-banner-live-bg'
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

  return {
    BackgroundBanner,
    auction,
    isLiveOpen,
    liveAuctionUrl
  }
}

export default connect(
  mapStateToProps
)(Banner)
