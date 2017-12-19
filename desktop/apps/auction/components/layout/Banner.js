import ClockView from 'desktop/components/clock/react'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import get from 'lodash.get'
import { connect } from 'react-redux'
import { data as sd } from 'sharify'

function Banner (props) {
  const {
    auction,
    coverImage,
    isClosed,
    isLiveOpen,
    isMobile,
    liveAuctionUrl,
    name
  } = props

  const trackEnterLive = () => {
    window.analytics.track('click', {
      type: 'button',
      label: 'enter live auction',
      flow: 'auctions',
      context_module: 'auction banner',
      destination_path: liveAuctionUrl.replace(sd.PREDICTION_URL, '')
    })
  }

  const b = block('auction-Banner')

  return (
    <div
      className={b({ isClosed, isMobile, isLiveOpen })}
      alt={name}
    >
      <div
        className={b('background-image', { isClosed, isLiveOpen })}
        style={{ backgroundImage: `url('${coverImage}')` }}
      />
      {(() => {
        if (isLiveOpen) {
          return (
            <div className={b('live-details')}>
              <h1>
                Live Bidding Now Open
              </h1>

              <a onClick={trackEnterLive} href={liveAuctionUrl} className='avant-garde-button-white'>
                Enter live auction
              </a>
            </div>
          )
        } else {
          return (
            <ClockView
              model={auction}
            />
          )
        }
      })()}
    </div>
  )
}

Banner.propTypes = {
  auction: PropTypes.object.isRequired,
  coverImage: PropTypes.string.isRequired,
  isClosed: PropTypes.bool.isRequired,
  isLiveOpen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  liveAuctionUrl: PropTypes.string,
  name: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const {
    auction,
    isLiveOpen,
    isMobile,
    liveAuctionUrl
  } = state.app

  const { cover_image, name } = auction.toJSON()
  const coverImage = get(cover_image, 'cropped.url', '')

  return {
    auction,
    coverImage,
    isClosed: state.artworkBrowser.isClosed,
    isLiveOpen,
    isMobile,
    liveAuctionUrl,
    name
  }
}

export default connect(
  mapStateToProps
)(Banner)

export const test = { Banner }
