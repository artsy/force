import ArtistFilter from '../artist_filter'
import MediumFilter from '../medium_filter'
import PropTypes from 'prop-types'
import RangeSlider from '../range_slider'
import React from 'react'
import { connect } from 'react-redux'
import { data as sd } from 'sharify'

function Sidebar ({ isClosed }) {
  const isCreativeTimeAuction = sd.AUCTION && sd.AUCTION._id === '593c3fac8b0c147c16a59381'

  return (
    <div className='auction-artworks-sidebar'>
      <div className='auction-artworks-sidebar__artist-filter'>
        { !isClosed && !isCreativeTimeAuction && <RangeSlider /> }
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
