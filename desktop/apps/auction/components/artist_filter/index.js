import { updateArtistParams } from '../../client/actions'
import BasicCheckbox from '../basic_checkbox'
import React from 'react'
import { connect } from 'react-redux'
import { map, contains } from 'underscore'

function ArtistFilter(props) {
  const {
    aggregatedArtists,
    filterParams,
    numArtistsYouFollow,
    updateArtistParamsAction,
    updateArtistsYouFollowParamAction,
    user
  } = props
  const artistIds = filterParams.artist_ids
  const allArtists = { id: 'artists-all', name: 'All' }
  const allArtistsSelected = artistIds.length === 0 && !filterParams.include_artworks_by_followed_artists
  const countDisplay = numArtistsYouFollow > 0 ? numArtistsYouFollow : undefined
  const artistsYouFollow = {
    id: 'artists-you-follow',
    count: countDisplay,
    name: 'Artists You Follow'
  }

  return (
    <div className='auction-artist-checkboxes'>
      <div className='auction-artist-checkboxes__title'>Artists</div>
      {
        user &&
        <div className='auction-artist-checkboxes__artists-you-follow'>
          <BasicCheckbox
            key={artistsYouFollow.id}
            item={artistsYouFollow}
            onClick={updateArtistParamsAction}
            checked={filterParams.include_artworks_by_followed_artists}
            disabled={numArtistsYouFollow === 0}
          />
        </div>
      }
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
    filterParams: state.auctionArtworks.filterParams,
    numArtistsYouFollow: state.auctionArtworks.numArtistsYouFollow,
    user: state.auctionArtworks.user
  }
}

const mapDispatchToProps = {
  updateArtistParamsAction: updateArtistParams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistFilter)
