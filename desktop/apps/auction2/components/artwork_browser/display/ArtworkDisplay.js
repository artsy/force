import Grid from 'desktop/components/react/grid/Grid'
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

  const DC = (props) =>
    <div>
      <img
        src={props.artwork.artwork.images[0].image_url}
        style={{
          width: '100%'
        }}
      />
    </div>

  return (
    <div>
      <Grid
        DisplayComponent={DC}
        artworks={saleArtworks}
      />
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

// {/* <div className={`auction2-page-artworks${listType}`}>
//   {
//     saleArtworks.map((saleArtwork) => (
//       <DisplayComponent
//         key={saleArtwork.id}
//         artwork={saleArtwork}
//       />
//     ))
//   }
//   { isFetchingArtworks && <div className='loading-spinner' /> }
// </div> */}
