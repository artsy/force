import Jump from 'desktop/components/jump/react'
import MasonryArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/MasonryArtwork'
import GridArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/GridArtwork'
import ListArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/ListArtwork'
import MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'

function ArtworkDisplay ({
  isFetchingArtworks,
  isListView,
  isMobile,
  isClosed,
  saleArtworks,
  saleId
}) {
  const listType = isListView ? '--list' : ''

  return (
    <div className={`auction2-page-artworks${listType}`}>
      {(() => {
        if (isMobile) {
          if (isFetchingArtworks) {
            // FIXME
            return (
              <div className='loading-spinner' />
            )

            // ListView
          } else if (isListView) {
            return saleArtworks.map((saleArtwork, key) => {
              return (
                <ListArtwork
                  artwork={saleArtwork}
                  key={key}
                />
              )
            })

            // GridView
          } else {
            return (
              <MasonryGrid
                columnCount={2}
                items={saleArtworks}
                getAspectRatio={(artwork) => {
                  return get(artwork, 'artwork.images.0.aspect_ratio')
                }}
                getDisplayComponent={(artwork) => {
                  return (
                    <MasonryArtwork artwork={artwork} />
                  )
                }}
              />
            )
          }

          // Desktop
        } else {
          const DisplayComponent = isListView ? ListArtwork : GridArtwork

          return (
            <div>
              { saleArtworks.map((saleArtwork) => (
                <DisplayComponent
                  key={saleArtwork.id}
                  artwork={saleArtwork}
                />
              ))}

              <Jump
                direction='bottom'
                element='.auction-artworks-header-desktop'
                offset='.mlh-navbar'
              />

              { isFetchingArtworks &&
                <div className='loading-spinner' /> }
            </div>
          )
        }
      })()}
    </div>
  )
}

ArtworkDisplay.propTypes = {
  isFetchingArtworks: PropTypes.bool.isRequired,
  isListView: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isClosed: PropTypes.bool.isRequired,
  saleArtworks: PropTypes.array.isRequired,
  saleId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    allFetched: state.auctionArtworks.allFetched,
    isFetchingArtworks: state.auctionArtworks.isFetchingArtworks,
    isListView: state.auctionArtworks.isListView,
    isMobile: state.app.isMobile,
    isClosed: state.app.auction.isClosed(),
    saleArtworks: state.auctionArtworks.saleArtworks,
    saleId: state.app.auction.get('id')
  }
}

export default connect(
  mapStateToProps
)(ArtworkDisplay)
