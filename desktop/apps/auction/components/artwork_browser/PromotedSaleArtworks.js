import PropTypes from 'prop-types'
import MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import React from 'react'
import get from 'lodash.get'
import { Artwork } from '@artsy/reaction-force/dist/Components/Artwork'
import { ArtworkRail } from '../artwork_rail/ArtworkRail'
import { RelayStubProvider } from 'desktop/components/react/RelayStubProvider'
import { connect } from 'react-redux'

function PromotedSaleArtworks (props) {
  const { isMobile, promotedSaleArtworks } = props
  const isRenderable = promotedSaleArtworks && promotedSaleArtworks.length

  if (!isRenderable) {
    return null
  }

  return (
    <RelayStubProvider>
      { isMobile
        ? <MasonryGrid
          mask
          title='Buy Now'
          columnCount={2}
          items={promotedSaleArtworks}
          getAspectRatio={({ artwork }) => {
            return get(artwork, 'images.0.aspect_ratio')
          }}
          getDisplayComponent={({ artwork }) => {
            return (
              <div onClick={() => (window.location = artwork.href)}>
                <Artwork artwork={artwork} />
              </div>
            )
          }}
        />
        // Desktop
        : <ArtworkRail
          title='Buy Now'
          artworks={promotedSaleArtworks}
          getDisplayComponent={({ artwork }) => {
            return (
              <div onClick={() => (window.location = artwork.href)}>
                <Artwork artwork={artwork} />
              </div>
            )
          }}
          />
      }
    </RelayStubProvider>
  )
}

PromotedSaleArtworks.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  promotedSaleArtworks: PropTypes.array.isRequired
}

PromotedSaleArtworks.defaultProps = {
  promotedSaleArtworks: []
}

const mapStateToProps = (state) => {
  const {
    app: {
      auction,
      isMobile
    }
  } = state

  const promotedSaleArtworks = get(auction.toJSON(), 'promoted_sale.sale_artworks', [])

  return {
    isMobile,
    promotedSaleArtworks
  }
}

export default connect(
  mapStateToProps
)(PromotedSaleArtworks)
