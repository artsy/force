import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import AuctionGridArtwork from '../auction_grid_artwork/index'
import AuctionListArtwork from '../auction_list_artwork/index'

function AuctionArtworks({ artworks, listView }) {
  const DisplayComponent = listView ? AuctionListArtwork : AuctionGridArtwork
  return (
    <div className={'auction2-artworks'}>
      {
        artworks.map((artwork) => (
          <DisplayComponent key={artwork.get('_id')} artwork={artwork} />
        ))
      }
    </div>
  )
}

AuctionArtworks.propTypes = {
  artworks: PropTypes.array.isRequired,
  listView: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    artworks: state.auctionArtworks.artworks,
    listView: state.auctionArtworks.listView
  }
}

const ArtworksContainer = connect(
  mapStateToProps
)(AuctionArtworks)

export default ArtworksContainer
