import GridArtwork from './artwork/GridArtwork'
import ListArtwork from './artwork/ListArtwork'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function ArtworkDisplay ({ isFetchingArtworks, isListView, saleArtworks }) {
  const DisplayComponent = isListView
    ? ListArtwork
    : GridArtwork

  const listType = isListView ? '--list' : ''

  return (
    <div className={`auction2-page-artworks${listType}`}>
      {
        saleArtworks.map((saleArtwork) => (
          <DisplayComponent
            key={saleArtwork.id}
            saleArtwork={saleArtwork}
          />
        ))
      }
      { isFetchingArtworks && <div className='loading-spinner' /> }
    </div>
  )
}

ArtworkDisplay.propTypes = {
  isFetchingArtworks: PropTypes.bool.isRequired,
  isListView: PropTypes.bool.isRequired,
  saleArtworks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    allFetched: state.auctionArtworks.allFetched,
    isFetchingArtworks: state.auctionArtworks.isFetchingArtworks,
    isListView: state.auctionArtworks.isListView,
    saleArtworks: state.auctionArtworks.saleArtworks
  }
}

export default connect(
  mapStateToProps
)(ArtworkDisplay)
