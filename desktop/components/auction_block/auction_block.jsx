import React, { PropTypes } from 'react'
import upcomingLabel from './utils/upcoming_label'

export default function AuctionBlock (props) {
  const {
    cover_image,
    end_at,
    href,
    id,
    is_closed,
    is_live_open,
    is_preview,
    name,
    live_start_at,
    relatedAuction,
    start_at
  } = props

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
  cover_image: PropTypes.object,
  end_at: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  is_closed: PropTypes.bool,
  is_live_open: PropTypes.bool,
  is_preview: PropTypes.bool,
  name: PropTypes.string,
  live_start_at: PropTypes.string,
  relatedAuction: PropTypes.bool,
  start_at: PropTypes.string
}

AuctionBlock.defaultProps = {
  relatedAuction: false
}
