import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'

function Registration (props) {
  const {
    isClosed,
    isQualifiedForBidding,
    isRegistrationEnded,
    numBidders,
    registerUrl
  } = props

  return (
    <div>
      {(() => {
        if (isClosed) {
          return null
        } else if (!isQualifiedForBidding) {
          return (
            <div className='auction2-registration-wrapper'>
              <button className='avant-garde-button-black is-block is-disabled'>
                Registration pending
              </button>
              <div className='auction2-registration-small auction2-registration-small-warning'>
                Reviewing submitted information
              </div>
            </div>
          )
        } else if (numBidders > 0) {
          return (
            <div className='auction2-registration-approved'>
              <span className='icon-check' />
              Approved to Bid
            </div>
          )
        } else if (isRegistrationEnded) {
          return (
            <div className='auction2-registration-wrapper'>
              <button className='avant-garde-button-black is-block is-disabled'>
                Registration closed
              </button>
              <div className='auction2-registration-small'>
                Registration required to bid
              </div>
            </div>
          )
        } else {
          return (
            <div className='auction2-registration-wrapper'>
              <a href={registerUrl} className='avant-garde-button-black is-block js-register-button'>
                Register to bid
              </a>
              <div className='auction2-registration-small'>
                Registration required to bid
              </div>
            </div>
          )
        }
      })()}

      <div className='auction2-registration-how-to-bid'>
        <strong>
          Questions?
        </strong>
        <br />
        <a href='/how-auctions-work'>
          How to Bid on Artsy
        </a>
      </div>

      <div className='auction2-registration-question'>
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
  isClosed: PropTypes.bool.isRequired,
  isQualifiedForBidding: PropTypes.bool.isRequired,
  isRegistrationEnded: PropTypes.bool.isRequired,
  numBidders: PropTypes.number.isRequired,
  registerUrl: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const { auction, me } = state.app
  const numBidders = get(me, 'bidders.length', 0)
  const isQualifiedForBidding = get(me, 'bidders.0.qualified_for_bidding', true)

  return {
    isClosed: auction.isClosed(),
    isQualifiedForBidding,
    isRegistrationEnded: auction.isRegistrationEnded(),
    numBidders,
    registerUrl: auction.registerUrl()
  }
}

export default connect(
  mapStateToProps
)(Registration)
