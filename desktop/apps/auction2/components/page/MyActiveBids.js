import BidStatus from 'desktop/components/bid_status/react'
import MeQuery from 'desktop/apps/auction2/utils/queries/me'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import block from 'bem-cn'
import metaphysics from 'lib/metaphysics.coffee'
import { data as sd } from 'sharify'
import { getLiveAuctionUrl } from 'utils/domain/auctions/urls'

export default class MyActiveBids extends Component {
  static propTypes = {
    lotStandings: PropTypes.array,
    saleId: PropTypes.string,
    user: PropTypes.object
  }

  state = {
    lotStandings: []
  }

  componentWillMount () {
    this.setState({
      lotStandings: this.props.lotStandings
    })
  }

  componentDidMount () {
    this.pollInterval = setInterval(this.getFreshData, sd.ACTIVE_BIDS_POLL_INTERVAL)
  }

  componentWillUnmount () {
    this.clearInterval(this.pollInterval)
  }

  getFreshData = async () => {
    const { saleId, user } = this.props

    const { me } = await metaphysics({
      query: MeQuery(saleId),
      req: {
        user
      }
    })

    this.setState({
      lotStandings: me.lot_standings
    })
  }

  render () {
    const b = block('auction-my-active-bids')

    return (
      <div className={b()}>
        <h2>
          Your Active Bids
        </h2>

        { this.state.lotStandings
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
              isLoggedIn: Boolean(this.props.user)
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
                  ? <a href={liveAuctionUrl} className={'avant-garde-button-white ' + b('bid-live-button')}>
                      Bid Live
                    </a>
                  : <div className={b('bid-status-cell')}>
                    <BidStatus bid={bid} saleArtwork={bid.sale_artwork} />
                  </div>
                  }

                {!sale.is_live_open &&
                  <a href={artwork.href} className={'avant-garde-button-white ' + b('bid-button')}>
                    Bid
                  </a> }
              </div>
            )
          })}
      </div>
    )
  }
}
