import ArtistFilter from 'desktop/apps/auction/components/artwork_browser/sidebar/ArtistFilter'
import MediumFilter from 'desktop/apps/auction/components/artwork_browser/sidebar/MediumFilter'
import RangeSlider from 'desktop/apps/auction/components/artwork_browser/sidebar/RangeSlider'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'

function Sidebar({ isClosed }) {
  const b = block('Sidebar')

  return (
    <div className={b()}>
      <div className={b('artist-filter')}>
        {!isClosed && <RangeSlider />}
        <MediumFilter />
        <ArtistFilter />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  isClosed: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.artworkBrowser.isClosed,
  }
}

export default connect(mapStateToProps)(Sidebar)

export const test = { Sidebar }
