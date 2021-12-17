import PropTypes from "prop-types"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { get } from "lodash"

function BidStatus(props) {
  const { isSold, currentBidDisplay, bidLabel } = props

  const b = block("auction-BidStatus")

  return (
    <div className={b()}>
      {isSold ? (
        <span className={b("bid-label")}>Sold</span>
      ) : (
        <div>
          <span className={b("bid-amount")}>{currentBidDisplay}</span>
          <span className="">{bidLabel}</span>
        </div>
      )}
    </div>
  )
}

BidStatus.propTypes = {
  isSold: PropTypes.bool.isRequired,
  currentBidDisplay: PropTypes.string.isRequired,
  bidLabel: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
  const {
    artworkItem: { artwork, counts, current_bid },
  } = props
  let bidLabel
  const bidCounts = get(artwork, "sale_artwork.counts") || counts
  const bidderPositions = get(bidCounts, "bidder_positions")

  if (bidderPositions) {
    const bidOrBids = bidderPositions > 1 ? "Bids" : "Bid"
    bidLabel = `(${bidderPositions} ${bidOrBids})`
  } else {
    bidLabel = ""
  }

  return {
    isSold: artwork.is_sold,
    currentBidDisplay: current_bid?.display,
    bidLabel,
  }
}

export default connect(mapStateToProps)(BidStatus)

export const test = { BidStatus }
