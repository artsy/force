import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import BidStatus from './BidStatus'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'

export default function MyActiveBids (props) {
  const { bidderPositions, me } = props

  if (!bidderPositions.length) {
    return null
  }

  const b = block('auction-my-active-bids')

  return (
    <div>
      <h2>
        Your Active Bids
      </h2>

      { bidderPositions
        .filter(bid => bid.sale_artwork)
        .map((bid, key) => {
          const {
            sale_artwork: {
              artwork,
              counts,
              id,
              highest_bid,
              sale,
              sale_id
            }
          } = bid

          const bidCount = counts.bidder_positions

          const liveAuctionUrl = getLiveAuctionUrl(sale_id, {
            isLoggedIn: Boolean(me)
          })

          return (
            <div
              className={b('active-bid')}
              data-artwork_id={id}
              key={key}
            >
              <div className={b('artwork-container')}>
                <a href={artwork.href}>
                  <img className={b('img')} src={artwork.image.url} />
                </a>
              </div>
              <div className={b('artwork')}>
                <div className={b('lot-number')}>
                  Lot {artwork.log_label}
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
              </div>
              <div className={b('current-bid')}>
                <b>Current Bid: </b> {highest_bid.display}
              </div>
              <div className={b('bids-num')}>
                {`(${bidCount} Bid${bidCount > 1 ? 's' : ''})`}
              </div>

              { sale.is_live_open
                ? <a
                  href={liveAuctionUrl}
                  className={'avant-garde-button-white ' + b('bid-live-button')}
                  >
                    Bid Live
                  </a>
                : <div>
                  <div className='bid-status-cell'>
                    <BidStatus
                      bid={bid}
                      saleArtwork={bid.sale_artwork}
                      />
                  </div>
                  <a
                    href={artwork.href}
                    className={'avant-garde-button-white ' + b('bid-button')}
                    >
                      Bid Live
                  </a>
                </div>
              }
            </div>
          )
        })}
    </div>
  )
}

MyActiveBids.propTypes = {
  bidderPositions: PropTypes.array,
  me: PropTypes.object
}
