import MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import GridArtwork from './artwork/GridArtwork'
import ListArtwork from './artwork/ListArtwork'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'

function ArtworkDisplay ({ isFetchingArtworks, isListView, saleArtworks }) {
  const DisplayComponent = isListView
    ? ListArtwork
    : GridArtwork

  const listType = isListView ? '--list' : ''
  const artworks = saleArtworks.map(saleArtwork => saleArtwork.artwork)

  return (
    <div>
      <MasonryGrid
        items={artworks}
        getAspectRatio={(artwork) => {
          return get(artwork, 'images.0.aspect_ratio', false)
        }}
        getDisplayComponent={(artwork) => {
          const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

          return (
            <img
              src={artworkImage}
              style={{
                width: '100%'
              }}
            />
          )
        }}
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
