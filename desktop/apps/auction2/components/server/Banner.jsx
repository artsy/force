import PropTypes from 'prop-types'
import React from 'react'
import buildTemplateComponent from 'desktop/components/react/utils/build_template_component'
import get from 'lodash.get'

export default function Banner (props) {
  const { auction, isLiveOpen, liveAuctionUrl } = props
  const { cover_image, name } = auction.toJSON()
  const imageUrl = get(cover_image, 'cropped.url', '')
  const Clock = buildTemplateComponent('desktop/components/clock/template.jade', { locals: { ...props } })

  const BackgroundBanner = (p) => (
    <div
      className='auction-banner-live-bg'
      style={{ backgroundImage: `url('${imageUrl}')` }}
      alt={name}
    >
      {p.children}
    </div>
  )

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

            {/*
              Mounted Client-side
              TODO: Port to React
            */}
            <div className='auction-clock white-overlay-clock js-auction-clock'>
              <Clock />
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
