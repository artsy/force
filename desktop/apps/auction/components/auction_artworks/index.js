import AuctionGridArtwork from '../auction_grid_artwork'
import AuctionListArtwork from '../auction_list_artwork'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function AuctionArtworks ({ isFetchingArtworks, isListView, saleArtworks }) {
  const DisplayComponent = isListView
    ? AuctionListArtwork
    : AuctionGridArtwork

  return (
    <div className='auction-page-artworks'>
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

AuctionArtworks.propTypes = {
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
)(AuctionArtworks)
