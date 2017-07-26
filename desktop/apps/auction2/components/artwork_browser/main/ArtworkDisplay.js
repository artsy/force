import Jump from 'desktop/components/jump/react'
import MasonryArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/MasonryArtwork'
import GridArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/GridArtwork'
import ListArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/ListArtwork'
import LoadingSpinner from 'desktop/apps/auction2/components/artwork_browser/main/LoadingSpinner'
import MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import get from 'lodash.get'
import { connect } from 'react-redux'

class ArtworkDisplay extends Component {
  static propTypes = {
    isFetchingArtworks: PropTypes.bool.isRequired,
    isListView: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    saleArtworks: PropTypes.array.isRequired
  }

  state = {
    isMounted: false,
    showFullScreenSpinner: false
  }

  componentDidMount () {
    this.setState({
      isMounted: true
    })
  }

  render () {
    const {
      isFetchingArtworks,
      isListView,
      isMobile,
      saleArtworks
    } = this.props

    const listType = isListView ? '--list' : ''

    const calculateScrollPosition = isMobile && this.state.isMounted && isFetchingArtworks
    let showFullScreenSpinner = false

    if (calculateScrollPosition) {
      showFullScreenSpinner = window.scrollY < window.innerHeight
    }

    return (
      <div className={`auction2-page-artworks${listType}`}>
        { showFullScreenSpinner &&
          <LoadingSpinner fullscreen /> }

        {(() => {
          if (isMobile) {
            if (isListView) {
              return (
                <div>
                  { saleArtworks.map((saleArtwork, key) => (
                    <ListArtwork
                      artwork={saleArtwork}
                      key={key}
                    />
                  ))}

                  <LoadingSpinner />
                </div>
              )

              // GridView
            } else {
              return (
                <div>
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

                  <LoadingSpinner />
                </div>
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

                <LoadingSpinner />
              </div>
            )
          }
        })()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isMobile } = state.app

  return {
    allFetched: state.artworkBrowser.allFetched,
    isFetchingArtworks: state.artworkBrowser.isFetchingArtworks,
    isListView: state.artworkBrowser.isListView,
    isMobile,
    isClosed: state.app.auction.isClosed(),
    saleArtworks: state.artworkBrowser.saleArtworks,
    saleId: state.app.auction.get('id')
  }
}

export default connect(
  mapStateToProps
)(ArtworkDisplay)

export const test = { ArtworkDisplay }
