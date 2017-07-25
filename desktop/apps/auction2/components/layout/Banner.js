import ClockView from 'desktop/components/clock/react'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import get from 'lodash.get'
import { connect } from 'react-redux'

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

  const b = block('auction2-banner')

  return (
    <div className={b({ isClosed, isMobile, isLiveOpen })} style={{ backgroundImage: `url('${coverImage}')` }} alt={name}>
      {(() => {
        if (isLiveOpen) {
          return (
            <div className={b('live-details')}>
              <h1>
                Live Bidding Now Open
              </h1>

              <a href={liveAuctionUrl} className='avant-garde-button-white'>
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
