import CommercialFilter from './CommercialFilter'
import WorksByFollowedArtists from './WorksByFollowedArtists'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function AuctionPage ({ displayFollowedArtistsRail }) {
  return (
    <div className='auction-main-page'>
      { displayFollowedArtistsRail && <WorksByFollowedArtists /> }
      <CommercialFilter />
    </div>
  )
}

AuctionPage.propTypes = {
  displayFollowedArtistsRail: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    displayFollowedArtistsRail: state.auctionArtworks.displayFollowedArtistsRail
  }
}

export default connect(
  mapStateToProps
)(AuctionPage)
