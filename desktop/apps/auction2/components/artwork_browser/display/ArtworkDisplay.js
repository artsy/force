import ArtworkBlock from 'desktop/apps/auction2/components/shared/ArtworkBlock'
import MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import GridArtworkDesktop from './artwork/GridArtworkDesktop'
import ListArtworkDesktop from './artwork/ListArtworkDesktop'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'

function ArtworkDisplay ({
  isFetchingArtworks,
  isListView,
  isMobile,
  saleArtworks,
  saleId
}) {
  const listType = isListView ? '--list' : ''

  return (
    <div className={`auction2-page-artworks${listType}`}>
      {(() => {
        if (isMobile) { // eslint-disable-line

          // ListView
          if (isListView) {
            return saleArtworks.map((saleArtwork, key) => {
              return (
                <ArtworkBlock
                  {...{ ...saleArtwork, sale_id: saleId }}
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
                    <GridArtworkDesktop
                      artwork={artwork}
                    />
                  )
                }}
              />
            )
          }

          // Desktop
        } else {
          const DisplayComponent = isListView
            ? ListArtworkDesktop
            : GridArtworkDesktop

          return (
            <div>
              { saleArtworks.map((saleArtwork) => (
                <DisplayComponent
                  key={saleArtwork.id}
                  artwork={saleArtwork}
                />
              ))}

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
  saleArtworks: PropTypes.array.isRequired,
  saleId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    allFetched: state.auctionArtworks.allFetched,
    isFetchingArtworks: state.auctionArtworks.isFetchingArtworks,
    isListView: state.auctionArtworks.isListView,
    isMobile: state.app.isMobile,
    saleArtworks: state.auctionArtworks.saleArtworks,
    saleId: state.app.auction.get('id')
  }
}

export default connect(
  mapStateToProps
)(ArtworkDisplay)
