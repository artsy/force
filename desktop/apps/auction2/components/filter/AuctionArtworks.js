import AuctionGridArtwork from './AuctionGridArtwork'
import AuctionListArtwork from './AuctionListArtwork'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

function AuctionArtworks ({ isFetchingArtworks, isListView, saleArtworks }) {
  const DisplayComponent = isListView
    ? AuctionListArtwork
    : AuctionGridArtwork

  const listType = isListView ? '--list' : ''

  return (
    <div className={`auction-page-artworks${listType}`}>
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
