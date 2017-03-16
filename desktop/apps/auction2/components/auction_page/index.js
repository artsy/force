import CommercialFilter from '../commercial_filter'
import WorksByFollowedArtists from '../works_by_followed_artists'
import React from 'react';
import { connect } from 'react-redux'

function AuctionPage({ displayFollowedArtistsRail }) {
  return (
    <div className='auction2-main-page'>
      { displayFollowedArtistsRail && <WorksByFollowedArtists /> }
      <CommercialFilter />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    displayFollowedArtistsRail: state.auctionArtworks.displayFollowedArtistsRail
  }
}

export default connect(
  mapStateToProps
)(AuctionPage)

