import PropTypes from 'prop-types'
import MasonryGrid from 'desktop/components/react/masonry_grid/MasonryGrid'
import React from 'react'
import get from 'lodash.get'
import { Artwork } from '@artsy/reaction-force/dist/Components/Artwork'
import { ArtworkRail } from '../artwork_rail/ArtworkRail'
import { RelayStubProvider } from 'desktop/components/react/RelayStubProvider'
import { connect } from 'react-redux'

function BuyNowSaleArtworks (props) {
  const { isMobile, buyNowSaleArtworks } = props

  return (
    <RelayStubProvider>
      { isMobile
        ? <MasonryGrid
          mask
          title='Buy Now'
          columnCount={2}
          items={buyNowSaleArtworks}
          getAspectRatio={({ artwork }) => {
            return get(artwork, 'images.0.aspect_ratio')
          }}
          getDisplayComponent={({ artwork }) => {
            return (
              <a href={artwork.href}>
                <Artwork artwork={artwork} />
              </a>
            )
          }}
        />
        // Desktop
        : <ArtworkRail
          title='Buy Now'
          artworks={buyNowSaleArtworks}
          getDisplayComponent={({ artwork }) => {
            return (
              <a href={artwork.href}>
                <Artwork artwork={artwork} />
              </a>
            )
          }}
          />
      }
    </RelayStubProvider>
  )
}

BuyNowSaleArtworks.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  buyNowSaleArtworks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const {
    app: {
      auction,
      isMobile
    }
  } = state

  const buyNowSaleArtworks = get(auction.toJSON(), 'promoted_sale.sale_artworks', [])

  return {
    isMobile,
    buyNowSaleArtworks
  }
}

export default connect(
  mapStateToProps
)(BuyNowSaleArtworks)
