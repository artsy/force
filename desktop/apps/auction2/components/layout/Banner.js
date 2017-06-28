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
    isLiveOpen,
    isMobile,
    liveAuctionUrl,
    name
  } = props

  const b = block('auction2-banner')

  return (
    <div>
      {isLiveOpen
        ? <Background
            coverImage={coverImage}
            name={name}
            className={b('live-open')}
          >
            <h1>
              Live Bidding Now Open
            </h1>

            <a href={liveAuctionUrl} className='avant-garde-button-white'>
              Enter live auction
            </a>
          </Background>
        : <Background
            coverImage={coverImage}
            name={name}
            className={b({ isMobile })}
          >
            <ClockView
              model={auction}
            />
          </Background>
        }
    </div>
  )
}

Banner.propTypes = {
  auction: PropTypes.object.isRequired,
  coverImage: PropTypes.object.isRequired,
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

  return {
    auction,
    coverImage: cover_image,
    isLiveOpen: false,
    isMobile,
    liveAuctionUrl,
    name
  }
}

export default connect(
  mapStateToProps
)(Banner)

// Helpers

function Background ({ children, className, coverImage, name }) {
  const imageUrl = get(coverImage, 'cropped.url', '')

  return (
    <div
      className={className}
      style={{ backgroundImage: `url('${imageUrl}')` }}
      alt={name}
    >
      {children}
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  coverImage: PropTypes.object,
  name: PropTypes.string
}
