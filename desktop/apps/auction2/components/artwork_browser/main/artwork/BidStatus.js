import PropTypes from 'prop-types'
import React from 'react'

export default function BidStatus ({ artworkItem }) {
  const {
    artwork,
    counts = {},
    current_bid
  } = artworkItem

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
    <div className='auction2-bid-status'>
      { artwork.is_sold
        ? <span className='auction2-bid-status__bid-label'>
            Sold
          </span>
        : <div>
          <span className='auction2-bid-status__bid-amount'>
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
  artworkItem: PropTypes.object.isRequired
}
