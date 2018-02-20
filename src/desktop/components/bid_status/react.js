import PropTypes from 'prop-types'
import React from 'react'
import BidStatusArrowIcon from './public/icons/bid-status-arrow.svg'
import block from 'bem-cn-lite'

export default function BidStatus(props) {
  const b = block('bid-status')

  const {
    bid,
    saleArtwork,
    messages: { winningMessage, reserveMessage, losingMessage },
  } = props

  const leadingBidder = bid.is_leading_bidder
  const reserveNotMet = saleArtwork.reserve_status === 'reserve_not_met'
  const isWinning = leadingBidder && !reserveNotMet
  const isReserve = leadingBidder && reserveNotMet

  const Arrow = (
    { direction } // eslint-disable-line
  ) => (
    <i className={b(`arrow-${direction}`)}>
      <BidStatusArrowIcon />
    </i>
  )

  return (
    <div className={b()}>
      {(() => {
        if (isWinning) {
          return (
            <div className={b('is-winning')}>
              <p>
                {winningMessage} <Arrow direction="up" />
              </p>
            </div>
          )
        } else if (isReserve) {
          return (
            <div className={b('is-winning-reserve-not-met')}>
              <p>
                {reserveMessage} <Arrow direction="up" />
              </p>
            </div>
          )
        } else {
          return (
            <div className={b('is-losing')}>
              <p>
                {losingMessage} <Arrow direction="down" />
              </p>
            </div>
          )
        }
      })()}
    </div>
  )
}

BidStatus.propTypes = {
  messages: PropTypes.shape({
    losingMessage: PropTypes.string,
    reserveMessage: PropTypes.string,
    winningMessage: PropTypes.string,
  }),
  bid: PropTypes.object.isRequired,
  saleArtwork: PropTypes.object.isRequired,
}

BidStatus.defaultProps = {
  messages: {
    losingMessage: 'Outbid',
    reserveMessage: 'Highest Bid',
    winningMessage: 'Highest Bid',
  },
}
