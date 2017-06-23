import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'

export default function Registration (props) {
  const { auction, me } = props
  const qualifiedForBidding = get(me, 'bidders.0.qualified_for_bidding', true)
  const numBidders = get(me, 'bidders.length', 0)

  return (
    <div>
      {(() => {
        if (auction.isClosed()) {
          return null
        } else if (!qualifiedForBidding) {
          return (
            <div className='auction-registration-wrapper'>
              <button className='avant-garde-button-black is-block is-disabled'>
                Registration pending
              </button>
              <div className='auction-registration-small auction-registration-small-warning'>
                Reviewing submitted information
              </div>
            </div>
          )
        } else if (numBidders > 0) {
          return (
            <div className='auction-registration-approved'>
              <span className='icon-check' />
              Approved to Bid
            </div>
          )
        } else if (auction.isRegistrationEnded()) {
          return (
            <div className='auction-registration-wrapper'>
              <button className='avant-garde-button-black is-block is-disabled'>
                Registration closed
              </button>
              <div className='auction-registration-small'>
                Registration required to bid
              </div>
            </div>
          )
        } else {
          return (
            <div className='auction-registration-wrapper'>
              <a href={auction.registerUrl()} className='avant-garde-button-black is-block js-register-button'>
                Register to bid
              </a>
              <div className='auction-registration-small'>
                Registration required to bid
              </div>
            </div>
          )
        }
      })()}

      <div className='auction-registration-how-to-bid'>
        <strong>
          Questions?
        </strong>
        <br />
        <a href='/how-auctions-work'>
          How to Bid on Artsy
        </a>
      </div>

      <div className='auction-registration-question'>
        <strong>
           Contact us
        </strong>
        <br />
        <a href='mailto:specialist@artsy.net'>
          specialist@artsy.net
        </a>
        <br />
        +1.646.712.8154
      </div>
    </div>
  )
}

Registration.propTypes = {
  auction: PropTypes.object.isRequired,
  me: PropTypes.object
}
