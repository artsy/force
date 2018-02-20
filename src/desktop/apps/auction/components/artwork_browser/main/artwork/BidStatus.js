import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'

function BidStatus (props) {
  const {
    isSold,
    currentBidDisplay,
    bidLabel
  } = props

  const b = block('auction-BidStatus')

  return (
    <div className={b()}>
      { isSold
        ? <span className={b('bid-label')}>
            Sold
          </span>
        : <div>
          <span className={b('bid-amount')}>
            {currentBidDisplay}
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
  isSold: PropTypes.bool.isRequired,
  currentBidDisplay: PropTypes.string.isRequired,
  bidLabel: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => {
  const {
    artworkItem: {
      artwork,
      counts = {},
      current_bid
    }
  } = props

  const { bidder_positions } = counts

  let bidLabel

  if (counts && bidder_positions) {
    const bidOrBids = bidder_positions > 1 ? 'Bids' : 'Bid'
    bidLabel = `(${bidder_positions} ${bidOrBids})`
  } else {
    bidLabel = ''
  }

  return {
    isSold: artwork.is_sold,
    currentBidDisplay: current_bid.display,
    bidLabel
  }
}

export default connect(
  mapStateToProps
)(BidStatus)

export const test = { BidStatus }
