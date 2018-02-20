import PropTypes from 'prop-types'
import React from 'react'
import _AuctionInfoDesktop from './AuctionInfoDesktop'
import _AuctionInfoMobile from './AuctionInfoMobile'
import { connect } from 'react-redux'

// FIXME: Rewire
let AuctionInfoDesktop = _AuctionInfoDesktop
let AuctionInfoMobile = _AuctionInfoMobile

export function AuctionInfoContainer({ isMobile }) {
  return isMobile ? <AuctionInfoMobile /> : <AuctionInfoDesktop />
}

AuctionInfoContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile,
})

export default connect(mapStateToProps)(AuctionInfoContainer)
