import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'

function ActiveBidItem (props) {
  const {
    BidStatus,
    artwork,
    bid,
    counts,
    id,
    isMobile,
    highest_bid,
    lot_label,
    sale,
    sale_id,
    user
  } = props

  const bidCount = counts.bidder_positions

  const liveAuctionUrl = getLiveAuctionUrl(sale_id, {
    isLoggedIn: Boolean(user)
  })

  const b = block('auction2-ActiveBidItem')

  return (
    <div className={b()} data-artwork_id={id}>
      <div className={b('artwork-container')}>
        <a href={artwork.href}>
          <img className={b('img')} src={artwork.image.url} />
        </a>
      </div>

      <div className={b('artwork')}>
        { isMobile && BidStatus &&
          <BidStatus
            bid={bid}
            saleArtwork={bid.sale_artwork}
          /> }

        <div className={b('lot-number')}>
          Lot {lot_label}
        </div>
        <h3>
          {artwork.artist.name}
        </h3>
        <div className={b('title')}>
          <em>
            {artwork.title}, &nbsp;
          </em>
          {artwork.date}
        </div>

        { isMobile && highest_bid &&
          <div className={b('current-and-bids')}>
            {highest_bid.display} {`(${bidCount} Bid${bidCount > 1 ? 's' : ''})`}
          </div> }
      </div>

      { highest_bid &&
        <div className={b('current-bid')}>
          <b>Current Bid:</b> {highest_bid.display}
        </div> }

      <div className={b('bids-num')}>
        {`(${bidCount} Bid${bidCount > 1 ? 's' : ''})`}
      </div>

      {/*  TODO: Clean this up */}

      { !isMobile && sale.is_live_open
        ? <a href={liveAuctionUrl} className={'avant-garde-button-white ' + b('bid-live-button')}>
            Bid Live
          </a>
        : !isMobile && <div className={b('bid-status-cell')}>
          <BidStatus bid={bid} saleArtwork={bid.sale_artwork} />
        </div>
        }

      { !isMobile && !sale.is_live_open &&
        <a href={artwork.href} className={'avant-garde-button-white ' + b('bid-button')}>
          Bid
        </a> }
    </div>
  )
}

ActiveBidItem.propTypes = {
  BidStatus: PropTypes.func,
  artwork: PropTypes.object.isRequired,
  bid: PropTypes.object,
  counts: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  highest_bid: PropTypes.object,
  lot_label: PropTypes.string.isRequired,
  sale: PropTypes.object,
  sale_id: PropTypes.string.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile,
  user: state.app.user
})

export default connect(
  mapStateToProps
)(ActiveBidItem)

export const test = { ActiveBidItem }
