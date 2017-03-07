import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import BasicCheckbox from '../basic_checkbox/index'
import { map, contains } from 'underscore'
import { updateArtistParams } from '../../actions'

function ArtistFilter({ aggregatedArtists, filterParams, updateArtistParamsAction }) {
  const artistIds = filterParams.artist_ids
  const allArtists = { id: 'artists-all', name: 'All' }
  const allArtistsSelected = artistIds.length == 0
  return (
    <div className='auction2-artist-checkboxes'>
      <div className='auction2-artist-checkboxes__title'>Artists</div>
      <BasicCheckbox
        key={allArtists.id}
        item={allArtists}
        onClick={updateArtistParamsAction}
        checked={allArtistsSelected}
      />
      {
        aggregatedArtists.map((agg) => {
          const artistSelected = contains(artistIds, agg.id)
          return <BasicCheckbox key={agg.id} item={agg} onClick={updateArtistParamsAction} checked={artistSelected} />
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    aggregatedArtists: state.auctionArtworks.aggregatedArtists,
    filterParams: state.auctionArtworks.filterParams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateArtistParamsAction: (artistId) => dispatch(updateArtistParams(artistId))
  }
}

const ArtistFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistFilter)

export default ArtistFilterContainer
