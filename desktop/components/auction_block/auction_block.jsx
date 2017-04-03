import React, { PropTypes } from 'react'
import upcomingLabel from './utils/upcoming_label'

export default function AuctionBlock (props) {
  const {
    relatedAuction,
    sale
  } = props

  const {
    cover_image,
    end_at,
    href,
    id,
    is_closed,
    is_live_open,
    is_preview,
    live_start_at,
    name,
    start_at
  } = sale

  const image = (cover_image &&
                cover_image.cropped &&
                cover_image.cropped.url) ||
                '/images/missing_image.png'

  const statusLabel = upcomingLabel(start_at, end_at,
                                     live_start_at, is_closed,
                                     is_live_open, is_preview)
  return (
    <div className='auction-block' key={id}>
      <a href={href}>
        <img src={image} alt={name} />

        <div className='auction-block__label-container'>
          { relatedAuction && <div className='auction-block__subtitle'>Related Auction</div> }
          <div className='auction-block__name'>
            {name}
          </div>

          <div className='auction-block__status'>
            {statusLabel}
          </div>
        </div>
      </a>
    </div>
  )
}

AuctionBlock.propTypes = {
  relatedAuction: PropTypes.bool,
  sale: PropTypes.object
}

AuctionBlock.defaultProps = {
  relatedAuction: false
}
