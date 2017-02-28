import ArtworkBrickView from '../../../../components/artwork_brick/view.coffee'
import React, { Component, PropTypes } from 'react'
import artworkBrickViewTemplate from '../../../../components/artwork_brick/index.jade'
import backboneReactView from '../../lib/backbone_react_view/index.jsx'
import classNames from 'classnames'

class AuctionArtworks extends Component {

  constructor(props) {
    super(props)

    this.onRenderArtworkBrickView = this.onRenderArtworkBrickView.bind(this)
  }

  onRenderArtworkBrickView(views) {
    const {
      artworkBrickView
    } = views

    if (this.props.user) {
      artworkBrickView.instance.postRender()
    }
  }

  onRemoveArtworkBrickView(views) {
    // const { artworkBrickView } = views
  }

  render() {
    const {
      Views,
      artwork: {
        auction
      }
    } = this.props

    const {
      artworks
    } = auction

    const classes = classNames(
      'artwork-section',
      'artwork-auction-artworks',
      'js-artwork-auction-artworks'
    )

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
          {artworks.map((artwork, index) => {
            return (
              <Views.ArtworkBrickView
                className='auction-artwork-brick'
                data={{ artwork }}
                key={index}
                onRender={this.onRenderArtworkBrickView}
                onRemove={this.onRemoveArtworkBrickView}
                template={artworkBrickViewTemplate}
                viewProps={{
                  context_page: '',
                  context_module: '',
                  id: artwork.id,
                  user: {}
                }}
              />
            )
          })}
        </div>
      </section>
    )
  }
}

AuctionArtworks.propTypes = {
  artwork: PropTypes.object.isRequired
}

AuctionArtworks.defaultProps = {
  artwork: {
    auction: {
      artworks: []
    }
  }
}

export default backboneReactView({
  views: [ArtworkBrickView],
  shouldMount: true
})(AuctionArtworks)
