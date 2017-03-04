import classNames from 'classnames'
import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import ArtistFilter from '../artist_filter/index'
import { updateArtistParams } from '../../actions'

function Sidebar({ aggregatedArtists, aggregatedMediums, filterParams, updateArtistParams }) {
  return (
    <div className={'auction2-artworks-sidebar'}>
      <div className={'auction2-artworks-sidebar__artist-filter'}>
        <ArtistFilter aggregatedArtists={aggregatedArtists} filterParams={filterParams} onClick={updateArtistParams} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    aggregatedArtists: state.auctionArtworks.aggregatedArtists,
    aggregatedMediums: state.auctionArtworks.aggregatedMediums,
    filterParams: state.auctionArtworks.filterParams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateArtistParams: (artistId) => dispatch(updateArtistParams(artistId))
  }
}

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

export default SidebarContainer
