import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import AuctionGridArtwork from '../auction_grid_artwork/index'
import AuctionListArtwork from '../auction_list_artwork/index'

function AuctionArtworks({ artworks, isListView }) {
  const DisplayComponent = isListView ? AuctionListArtwork : AuctionGridArtwork
  return (
    <div className={'auction2-artworks'}>
      {
        artworks.map((artwork) => (
          <DisplayComponent key={artwork._id} artwork={artwork} />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artworks: state.auctionArtworks.artworks,
    isListView: state.auctionArtworks.isListView
  }
}

const ArtworksContainer = connect(
  mapStateToProps
)(AuctionArtworks)

export default ArtworksContainer
