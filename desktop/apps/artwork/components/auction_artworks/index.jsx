import ArtworkBrickView from '../../../../components/artwork_brick/view.coffee'
import React, { Component, PropTypes } from 'react'
import artworkBrickViewTemplate from '../../../../components/artwork_brick/index.jade'
import backboneReactView from '../../lib/backbone_react_view/index.jsx'
import classNames from 'classnames'

class AuctionArtworks extends Component {

  static propTypes = {
    artwork: PropTypes.object.isRequired
  }

  static defaultProps = {
    artwork: {
      auction: {
        artworks: []
      }
    }
  }

  onRenderArtworkBrickView = ({ artworkBrickView }) => {
    artworkBrickView.instance.postRender()
  }

  componentDidMount() {
    this.selectSavedArtworks()
  }

  selectSavedArtworks() {
    const {
      artwork: {
        auction: {
          artworks
        }
      },
      user
    } = this.props

    const artworkIds = artworks.map(artwork => artwork.id)

    user
      .related()
      .savedArtworks
      .check(artworkIds)
  }

  render() {
    const {
      Views,
      artwork: {
        auction
      },
      user
    } = this.props

    const {
      artworks
    } = auction

    const classes = classNames(
      'artwork-section',
      'artwork-auction-artworks',
      'js-artwork-auction-artworks'
    )

    const temp = artworks.slice(0, 3)

    return (
      <section className={classes}>
        <header>
          <h3 className='artwork-auction-artworks__header__name'>
            Other Works from the Auction
          </h3>
          <a href={auction.href} className='artwork-artist-artworks__header__jump'>
            View All
          </a>
        </header>

        <div>
          {temp.map((artwork, index) => {
            return (
              <Views.ArtworkBrickView
                className='auction-artwork-brick'
                data={{ artwork }}
                key={index}
                onRender={this.onRenderArtworkBrickView}
                onRemove={x => x}
                template={artworkBrickViewTemplate}
                viewProps={{
                  context_page: 'Artwork Page',
                  context_module: 'Artwork auction module',
                  id: artwork.id,
                  user
                }}
              />
            )
          })}
        </div>
      </section>
    )
  }
}

export default backboneReactView({
  views: [ArtworkBrickView],
  shouldMount: true
})(AuctionArtworks)
