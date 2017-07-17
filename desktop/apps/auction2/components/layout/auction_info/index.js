import PropTypes from 'prop-types'
import React from 'react'
import AuctionInfoDesktop from './AuctionInfoDesktop'
import AuctionInfoMobile from './AuctionInfoMobile'
import { connect } from 'react-redux'

function AuctionInfoContainer ({ isMobile }) {
  return isMobile
    ? <AuctionInfoMobile />
    : <AuctionInfoDesktop />
}

AuctionInfoContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile
})

export default connect(
  mapStateToProps
)(AuctionInfoContainer)

export const test = { AuctionInfoContainer }
