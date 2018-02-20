import LoadingSpinner from 'desktop/apps/auction/components/artwork_browser/main/LoadingSpinner'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _GridArtwork from 'desktop/apps/auction/components/artwork_browser/main/artwork/GridArtwork'
import _InfiniteScroll from 'desktop/components/react/infinite_scroll/InfiniteScroll'
import _Jump from 'desktop/components/jump/react'
import _ListArtwork from 'desktop/apps/auction/components/artwork_browser/main/artwork/ListArtwork'
import _MasonryArtwork from 'desktop/apps/auction/components/artwork_browser/main/artwork/MasonryArtwork'
import _MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import block from 'bem-cn-lite'
import get from 'lodash.get'
import { infiniteScroll } from 'desktop/apps/auction/actions/artworkBrowser'
import { connect } from 'react-redux'

// FIXME: Rewire
let GridArtwork = _GridArtwork
let InfiniteScroll = _InfiniteScroll
let Jump = _Jump
let ListArtwork = _ListArtwork
let MasonryArtwork = _MasonryArtwork
let MasonryGrid = _MasonryGrid

export class ArtworkDisplay extends Component {
  static propTypes = {
    infiniteScrollAction: PropTypes.func.isRequired,
    isFetchingArtworks: PropTypes.bool.isRequired,
    isListView: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    saleArtworks: PropTypes.array.isRequired,
  }

  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
  }

  render() {
    const {
      infiniteScrollAction,
      isFetchingArtworks,
      isListView,
      isMobile,
      saleArtworks,
    } = this.props

    const listType = isListView ? '--list' : ''

    const calculateScrollPosition =
      isMobile && this.state.isMounted && isFetchingArtworks
    let showFullScreenSpinner = false

    if (calculateScrollPosition) {
      showFullScreenSpinner = window.scrollY < window.innerHeight
    }

    const b = block('auction-page-ArtworkDisplay')

    return (
      <InfiniteScroll
        triggerElement=".auction-page-ArtworkDisplay, .auction-page-ArtworkDisplay__artworks--list"
        onTrigger={infiniteScrollAction}
      >
        <div className={b()}>
          <div className={b(`artworks${listType}`)}>
            {showFullScreenSpinner && <LoadingSpinner fullscreen />}

            {(() => {
              if (isMobile) {
                if (isListView) {
                  return (
                    <div>
                      {saleArtworks.map((saleArtwork, key) => (
                        <ListArtwork saleArtwork={saleArtwork} key={key} />
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
                        mask={false}
                        getAspectRatio={(saleArtwork) => {
                          return get(
                            saleArtwork,
                            'artwork.images.0.aspect_ratio'
                          )
                        }}
                        getDisplayComponent={(saleArtwork) => {
                          return <MasonryArtwork saleArtwork={saleArtwork} />
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
                    {saleArtworks.map((saleArtwork) => (
                      <DisplayComponent
                        key={saleArtwork.id}
                        saleArtwork={saleArtwork}
                      />
                    ))}

                    <Jump
                      threshold={
                        typeof window !== 'undefined'
                          ? window.innerHeight * 2
                          : 0
                      }
                      direction="bottom"
                      element=".auction-artworks-HeaderDesktop"
                      offset=".mlh-navbar"
                    />

                    <LoadingSpinner />
                  </div>
                )
              }
            })()}
          </div>
        </div>
      </InfiniteScroll>
    )
  }
}

const mapStateToProps = (state) => {
  const { auction, isMobile } = state.app

  return {
    allFetched: state.artworkBrowser.allFetched,
    isFetchingArtworks: state.artworkBrowser.isFetchingArtworks,
    isListView: state.artworkBrowser.isListView,
    isMobile,
    isClosed: auction.isClosed(),
    saleArtworks: state.artworkBrowser.saleArtworks,
    saleId: auction.get('id'),
  }
}

const mapDispatchToProps = {
  infiniteScrollAction: infiniteScroll,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDisplay)
