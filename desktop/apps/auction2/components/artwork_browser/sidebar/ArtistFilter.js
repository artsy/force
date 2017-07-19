import BasicCheckbox from './BasicCheckbox'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { contains } from 'underscore'
import { updateArtistParams } from 'desktop/apps/auction2/actions/filter'

function ArtistFilter (props) {
  const {
    aggregatedArtists,
    allArtists,
    allArtistsSelected,
    artistIds,
    artistsYouFollow,
    includeArtworksByFollowedArtists,
    numArtistsYouFollow,
    updateArtistParamsAction,
    user
  } = props

  return (
    <div className='auction2-artist-checkboxes'>
      <div className='auction2-artist-checkboxes__title'>Artists</div>
      {
        user &&
        <div className='auction2-artist-checkboxes__artists-you-follow'>
          <BasicCheckbox
            key={artistsYouFollow.id}
            item={artistsYouFollow}
            onClick={updateArtistParamsAction}
            checked={includeArtworksByFollowedArtists}
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

ArtistFilter.propTypes = {
  aggregatedArtists: PropTypes.array.isRequired,
  allArtists: PropTypes.object.isRequired,
  allArtistsSelected: PropTypes.bool.isRequired,
  artistIds: PropTypes.array.isRequired,
  artistsYouFollow: PropTypes.object.isRequired,
  includeArtworksByFollowedArtists: PropTypes.bool.isRequired,
  numArtistsYouFollow: PropTypes.number,
  updateArtistParamsAction: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const {
    aggregatedArtists,
    filterParams,
    numArtistsYouFollow,
    user
  } = state.auctionArtworks

  const artistIds = filterParams.artist_ids
  const includeArtworksByFollowedArtists = filterParams.include_artworks_by_followed_artists
  const allArtists = { id: 'artists-all', name: 'All' }
  const allArtistsSelected = artistIds.length === 0 && !filterParams.include_artworks_by_followed_artists
  const countDisplay = numArtistsYouFollow > 0 ? numArtistsYouFollow : undefined
  const artistsYouFollow = {
    id: 'artists-you-follow',
    count: countDisplay,
    name: 'Artists You Follow'
  }

  return {
    aggregatedArtists,
    allArtists,
    allArtistsSelected,
    artistIds,
    artistsYouFollow,
    includeArtworksByFollowedArtists,
    user
  }
}

const mapDispatchToProps = {
  updateArtistParamsAction: updateArtistParams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistFilter)
