import ArtistFilter from 'desktop/apps/auction2/components/artwork_browser/sidebar/ArtistFilter'
import MediumFilter from 'desktop/apps/auction2/components/artwork_browser/sidebar/MediumFilter'
import RangeSlider from 'desktop/apps/auction2/components/artwork_browser/sidebar/RangeSlider'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function Sidebar ({ isClosed }) {
  return (
    <div className='auction2-artworks-sidebar'>
      <div className='auction2-artworks-sidebar__artist-filter'>
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

export const test = { Sidebar }
