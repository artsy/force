import ArtistFilter from '../artist_filter'
import BasicCheckbox from '../basic_checkbox'
import { connect } from 'react-redux'
import MediumFilter from '../medium_filter'
import RangeSlider from '../range_slider'
import React from 'react'

function Sidebar({ isClosed }) {
  return (
    <div className='auction-artworks-sidebar'>
      <div className='auction-artworks-sidebar__artist-filter'>
        { !isClosed && <RangeSlider /> }
        <MediumFilter />
        <ArtistFilter />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.auctionArtworks.isClosed
  }
}

export default connect(
  mapStateToProps,
)(Sidebar)
