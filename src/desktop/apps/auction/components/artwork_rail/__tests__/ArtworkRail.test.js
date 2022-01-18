import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { ArtworkRail } from "../ArtworkRail"
import { promotedSaleArtworks } from "../../artwork_browser/__tests__/fixtures/promotedSaleArtworks"

describe.skip("auction/components/artwork_rail/ArtworkRail", () => {
  const data = {
    app: {
      auction: {
        name: "An Auction",
        sale_type: "auction promo",
        eligible_sale_artworks_count: 0,
        promoted_sale: {
          saleArtworksConnection: promotedSaleArtworks,
        },
      },
    },
  }

  // FIXME: Reenable
  it.skip("renders an interactive rail", () => {
    const { wrapper } = renderTestComponent({
      Component: ArtworkRail,
      options: { renderMode: "mount" },
      data,
      props: {
        title: "Buy now",
        artworks: promotedSaleArtworks,
        getDisplayComponent: ({ artwork }) => {
          // eslint-disable-line
          return <div>{artwork.id}</div>
        },
      },
    })

    wrapper.html().should.containEql("Buy now")
    wrapper.html().should.containEql("auction-ArtworkRail__page-left")
    wrapper.html().should.containEql("auction-ArtworkRail__page-right")

    // First page
    wrapper
      .find(".auction-ArtworkRail__page-left .disabled")
      .length.should.equal(1)
    wrapper
      .find(".auction-ArtworkRail__page-right .disabled")
      .length.should.equal(0)
    wrapper.find(".auction-ArtworkRail__artwork").length.should.equal(4)
    wrapper.find(".auction-ArtworkRail__page-right").simulate("click")

    // Second page
    wrapper.find(".auction-ArtworkRail__artwork").length.should.equal(2) // second page
    wrapper
      .find(".auction-ArtworkRail__page-left .disabled")
      .length.should.equal(0)
    wrapper
      .find(".auction-ArtworkRail__page-right .disabled")
      .length.should.equal(1)
    wrapper.find(".auction-ArtworkRail__page-left").simulate("click")

    // Back to first page
    wrapper
      .find(".auction-ArtworkRail__page-left .disabled")
      .length.should.equal(1)
    wrapper
      .find(".auction-ArtworkRail__page-right .disabled")
      .length.should.equal(0)
    wrapper.find(".auction-ArtworkRail__artwork").length.should.equal(4)
  })
})
