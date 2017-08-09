import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'

function LoadingSpinner ({ fullscreen, isFetchingArtworks }) {
  const b = block('auction2-LoadingSpinner')

  return (
    <div className={b({ fullscreen })}>
      { isFetchingArtworks &&
        <div className='loading-spinner' /> }
    </div>
  )
}

LoadingSpinner.propTypes = {
  fullscreen: PropTypes.bool,
  isFetchingArtworks: PropTypes.bool.isRequired
}

LoadingSpinner.defaultProps = {
  fullscreen: false
}

const mapStateToProps = (state) => ({
  isFetchingArtworks: state.artworkBrowser.isFetchingArtworks
})

export default connect(
  mapStateToProps
)(LoadingSpinner)
