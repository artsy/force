import PropTypes from 'prop-types'
import React from 'react'

export default function BidStatus ({ saleArtwork }) {
  const {
    artwork,
    counts = {},
    current_bid
  } = saleArtwork

  const {
    bidder_positions
  } = counts

  let bidLabel

  if (counts && bidder_positions) {
    const bidOrBids = bidder_positions > 1 ? 'Bids' : 'Bid'
    bidLabel = `(${bidder_positions} ${bidOrBids})`
  } else {
    bidLabel = ''
  }

  return (
    <div className='auction-bid-status'>
      { artwork.is_sold
        ? <span className='auction-bid-status__bid-label'>
            SOLD
          </span>
        : <div>
          <span className='auction-bid-status__bid-amount'>
            {current_bid.display}
          </span>
          <span className=''>
            {bidLabel}
          </span>
        </div>
      }
    </div>
  )
}

BidStatus.propTypes = {
  saleArtwork: PropTypes.object.isRequired
}
