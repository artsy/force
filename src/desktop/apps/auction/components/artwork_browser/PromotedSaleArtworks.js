import PropTypes from "prop-types"
import MasonryGrid from "desktop/components/react/masonry_grid/MasonryGrid"
import { Fragment } from "react"
import { get } from "lodash"
import { Artwork } from "v2/Components/Artwork"
import { ArtworkRail } from "../artwork_rail/ArtworkRail"
import { connect } from "react-redux"
import { RelayStubProvider } from "desktop/components/react/RelayStubProvider"

function PromotedSaleArtworks(props) {
  const { isClosed, isMobile, promotedSaleArtworks } = props
  const isRenderable = Boolean(
    !isClosed && promotedSaleArtworks && promotedSaleArtworks.length
  )

  if (!isRenderable) {
    return null
  }

  return (
    <Fragment>
      {isMobile ? (
        <MasonryGrid
          mask
          title="Buy now"
          columnCount={2}
          items={promotedSaleArtworks}
          getAspectRatio={({ artwork }) => {
            return get(artwork, "images.0.aspect_ratio")
          }}
          getDisplayComponent={({ artwork }) => {
            return (
              <div onClick={() => (window.location = artwork.href)}>
                <RelayStubProvider>
                  <Artwork artwork={artwork} />
                </RelayStubProvider>
              </div>
            )
          }}
        />
      ) : (
        // Desktop
        <ArtworkRail
          title="Buy now"
          artworks={promotedSaleArtworks}
          getDisplayComponent={({ artwork }) => {
            return (
              <div onClick={() => (window.location = artwork.href)}>
                <RelayStubProvider>
                  <Artwork artwork={artwork} />
                </RelayStubProvider>
              </div>
            )
          }}
        />
      )}
    </Fragment>
  )
}

PromotedSaleArtworks.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  promotedSaleArtworks: PropTypes.array.isRequired,
}

PromotedSaleArtworks.defaultProps = {
  promotedSaleArtworks: [],
}

const mapStateToProps = state => {
  const {
    app: { auction, isMobile },
  } = state

  const auctionData = auction.toJSON()
  const promotedSaleArtworks = get(
    auctionData,
    "promoted_sale.saleArtworksConnection",
    []
  )

  return {
    isClosed: auctionData.is_closed,
    isMobile,
    promotedSaleArtworks,
  }
}

export default connect(mapStateToProps)(PromotedSaleArtworks)
