import ArtistFilter from '../artist_filter'
import BasicCheckbox from '../basic_checkbox'
import { connect } from 'react-redux'
import MediumFilter from '../medium_filter'
import RangeSlider from '../range_slider'
import React from 'react'

function Sidebar({ isOpen }) {
  return (
    <div className='auction2-artworks-sidebar'>
      <div className='auction2-artworks-sidebar__artist-filter'>
        { isOpen && <RangeSlider /> }
        <MediumFilter />
        <ArtistFilter />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.auctionArtworks.isOpen
  }
}

export default connect(
  mapStateToProps,
)(Sidebar)
