import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import get from 'lodash.get'
import { connect } from 'react-redux'

function Registration (props) {
  const {
    isClosed,
    isEcommerceSale,
    isQualifiedForBidding,
    isRegistrationEnded,
    numBidders,
    registerUrl,
    showContactInfo
  } = props

  const b = block('auction-Registration')

  return (
    <div className={b()}>
      {(() => {
        if (isEcommerceSale) {
          return null
        } else if (isClosed) {
          return null
        } else if (!isQualifiedForBidding) {
          return (
            <div className={b('wrapper')}>
              <button className='avant-garde-button-black is-block is-disabled'>
                Registration pending
              </button>
              <div className={b('small', { warning: true })}>
                Reviewing submitted information
              </div>
            </div>
          )
        } else if (numBidders > 0) {
          return (
            <div className={b('approved')}>
              <span className='icon-check' />
              Approved to Bid
            </div>
          )
        } else if (isRegistrationEnded) {
          return (
            <div className={b('wrapper')}>
              <button className='avant-garde-button-black is-block is-disabled'>
                Registration closed
              </button>
              <div className={b('small')}>
                Registration required to bid
              </div>
            </div>
          )
        } else {
          return (
            <div className={b('wrapper')}>
              <a href={registerUrl} className='avant-garde-button-black is-block js-register-button'>
                Register to bid
              </a>
              <div className={b('small')}>
                Registration required to bid
              </div>
            </div>
          )
        }
      })()}

      {
        showContactInfo && // Desktop only
          <div>

            <div className={b('how-to-bid')}>
              <strong>
                Questions?
              </strong>
              <br />
              <a href='/how-auctions-work'>
                How to Bid on Artsy
              </a>
            </div>

            <div className={b('question')}>
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
      }
    </div>
  )
}

Registration.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  isEcommerceSale: PropTypes.bool,
  isQualifiedForBidding: PropTypes.bool.isRequired,
  isRegistrationEnded: PropTypes.bool.isRequired,
  numBidders: PropTypes.number.isRequired,
  registerUrl: PropTypes.string.isRequired,
  showContactInfo: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { auction, isEcommerceSale, isMobile, me } = state.app
  const numBidders = get(me, 'bidders.length', 0)
  const isQualifiedForBidding = get(me, 'bidders.0.qualified_for_bidding', true)
  const showContactInfo = !isMobile

  return {
    isClosed: auction.isClosed() || auction.get('clockState') === 'closed',
    isEcommerceSale,
    isMobile,
    isQualifiedForBidding,
    isRegistrationEnded: auction.isRegistrationEnded(),
    numBidders,
    registerUrl: auction.registerUrl(),
    showContactInfo
  }
}

export default connect(
  mapStateToProps
)(Registration)

// Helpers

export const test = { Registration }
