import ArtistFilter from '../artist_filter'
import MediumFilter from '../medium_filter'
import RangeSlider from '../range_slider'
import { default as React, PropTypes } from 'react';

export default function Sidebar() {
  return (
    <div className='auction2-artworks-sidebar'>
      <div className='auction2-artworks-sidebar__artist-filter'>
        <RangeSlider />
        <MediumFilter />
        <ArtistFilter />
      </div>
    </div>
  )
}
