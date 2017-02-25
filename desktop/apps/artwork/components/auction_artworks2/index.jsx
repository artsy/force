import ArtworkBrickBackboneView from '../../../../components/artwork_brick/view.coffee'
import React, { Component, PropTypes } from 'react'
import artworkBrickViewTemplate from '../../../../components/artwork_brick/index.jade'
import backboneComponent from './backbone_component.jsx'
import classNames from 'classnames'

class AuctionArtworks extends Component {

  render() {
    const {
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

        <div className='auction-artwork-brick'>
          {artworks.map((artwork, index) => {
            return (
              <div key={index}>
                {/* <TemplateRenderer
                  data={{ artwork }}
                  template={artworkBrickViewTemplate}
                  onRender={this.renderArtworkBrickView.bind(this)}
                /> */}
              </div>
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

module.exports = backboneComponent({
  backboneViews: [ArtworkBrickBackboneView],
  shouldMount: true
})(AuctionArtworks)


// WIP

/*
renderArtworkBrickView({ template }) {
  const {
    user
  } = this.props

  const view = new ArtworkBrickBackboneView({
    el: template,
    id: $(template).data('id'),
    user
  })

  view.render()

  if (user) {
    view.postRender()
  }

  this.backboneViews.push(view)
}
*/
