import BidStatus from 'desktop/components/bid_status/react'
import MeQuery from 'desktop/apps/auction2/utils/queries/me'
import MyActiveBidsView from 'desktop/components/my_active_bids/view.coffee'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import block from 'bem-cn'
import metaphysics from 'lib/metaphysics.coffee'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'

export default class MyActiveBids extends Component {
  static propTypes = {
    bidderPositions: PropTypes.array,
    saleId: PropTypes.string,
    user: PropTypes.object
  }

  state = {
    bidderPositions: []
  }

  componentWillMount () {
    this.setState({
      bidderPositions: this.props.bidderPositions
    })
  }

  componentDidMount () {
    this.startPoll()
  }

  componentWillUnmount () {
    this.stopPoll()
  }

  async startPoll () {
    const { saleId, user } = this.props

    const response = await metaphysics({
      query: MeQuery(saleId),
      req: user
    })

    console.log(response)
  }

  stopPoll () {

  }

  render () {
    const b = block('auction-my-active-bids')
    const { bidderPositions, user } = this.props

    return (
      <div className={b()}>
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
              isLoggedIn: Boolean(user)
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
                  : <div className={b('bid-status-cell')}>
                    <BidStatus
                      bid={bid}
                      saleArtwork={bid.sale_artwork}
                        />
                  </div> }

                <a
                  href={artwork.href}
                  className={'avant-garde-button-white ' + b('bid-button')}
                  >
                    Bid
                </a>
              </div>
            )
          })}
      </div>
    )
  }
}
