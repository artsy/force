import ArtistFilter from '../artist_filter'
import BasicCheckbox from '../basic_checkbox'
import MediumFilter from '../medium_filter'
import RangeSlider from '../range_slider'
import React from 'react'
import { connect } from 'react-redux'

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
