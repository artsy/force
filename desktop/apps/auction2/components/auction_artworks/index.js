import AuctionGridArtwork from '../auction_grid_artwork'
import AuctionListArtwork from '../auction_list_artwork'
import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'

function AuctionArtworks({ artworks, isFetchingArtworks, isListView }) {
  const DisplayComponent = isListView ? AuctionListArtwork : AuctionGridArtwork
  return (
    <div className='auction2-artworks'>
      {
        artworks.map((artwork) => (
          <DisplayComponent key={artwork._id} artwork={artwork} />
        ))
      }
      { isFetchingArtworks && <div className='loading-spinner'></div> }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artworks: state.auctionArtworks.artworks,
    isFetchingArtworks: state.auctionArtworks.isFetchingArtworks,
    isListView: state.auctionArtworks.isListView
  }
}

export default connect(
  mapStateToProps
)(AuctionArtworks)
