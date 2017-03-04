import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import BasicCheckbox from '../basic_checkbox/index'
import { map, contains } from 'underscore'

export default function ArtistFilter({ aggregatedArtists, filterParams, onClick }) {
  const artistIds = filterParams.artist_ids
  const allArtists = { id: 'artists-all', name: 'All' }
  const allArtistsSelected = artistIds.length == 0
  return (
    <div className={'auction2-artist-checkboxes'}>
      <div className={'auction2-artist-checkboxes__title'}>Artists</div>
      <BasicCheckbox key={allArtists.id} item={allArtists} onClick={onClick} checked={allArtistsSelected} />
      {
        aggregatedArtists.map((agg) => {
          const artistSelected = contains(artistIds, agg.id)
          return <BasicCheckbox key={agg.id} item={agg} onClick={onClick} checked={artistSelected} />
        })
      }
    </div>
  )
}
