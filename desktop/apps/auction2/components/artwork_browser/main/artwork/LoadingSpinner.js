import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function LoadingSpinner ({ isFetchingArtworks }) {
  return (
    isFetchingArtworks && (
      <div className='loading-spinner' />
    )
  )
}

LoadingSpinner.propTypes = {
  isFetchingArtworks: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isFetchingArtworks: state.artworkBrowser.isFetchingArtworks
})

export default connect(
  mapStateToProps
)(LoadingSpinner)
