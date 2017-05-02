import ArtistFilter from '../artist_filter'
import MediumFilter from '../medium_filter'
import PropTypes from 'prop-types'
import RangeSlider from '../range_slider'
import React from 'react'
import { connect } from 'react-redux'

function Sidebar ({ isClosed }) {
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

Sidebar.propTypes = {
  isClosed: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.auctionArtworks.isClosed
  }
}

export default connect(
  mapStateToProps,
)(Sidebar)
