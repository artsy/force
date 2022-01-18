import PromotedSaleArtworks from "../PromotedSaleArtworks"
import MasonryGrid from "desktop/components/react/masonry_grid/MasonryGrid"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { ArtworkRail } from "../../artwork_rail/ArtworkRail"
import { promotedSaleArtworks } from "../__tests__/fixtures/promotedSaleArtworks"
import { cloneDeep } from "lodash"

describe.skip("auction/components/artwork_browser/PromotedSaleArtworks", () => {
  const data = {
    app: {
      isMobile: false,
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

  it("renders a <ArtworkRail /> on desktop", () => {
    const { wrapper } = renderTestComponent({
      Component: PromotedSaleArtworks,
      data,
      props: {
        promotedSaleArtworks,
      },
    })

    expect(wrapper.html()).toMatch("Buy now")
    expect(wrapper.find(ArtworkRail).length).toBe(1)
  })

  it("renders a <MasonryGrid /> on mobile", () => {
    let mobileData = cloneDeep(data)
    mobileData.app.isMobile = true

    const { wrapper } = renderTestComponent({
      Component: PromotedSaleArtworks,
      data: mobileData,
      props: {
        promotedSaleArtworks,
      },
    })

    expect(wrapper.html()).toMatch("Buy now")
    expect(wrapper.find(MasonryGrid).length).toBe(1)
  })

  it("does not render if sale is closed in desktop", () => {
    let updatedData = cloneDeep(data)
    updatedData.app.auction.is_closed = true

    const { wrapper } = renderTestComponent({
      Component: PromotedSaleArtworks,
      data: updatedData,
      props: {
        promotedSaleArtworks,
      },
    })

    expect(wrapper.find(ArtworkRail).length).toBe(0)
  })

  it("does not render if sale is closed in mobile", () => {
    let mobileData = cloneDeep(data)
    mobileData.app.isMobile = true
    mobileData.app.auction.is_closed = true

    const { wrapper } = renderTestComponent({
      Component: PromotedSaleArtworks,
      data: mobileData,
      props: {
        promotedSaleArtworks,
      },
    })

    expect(wrapper.find(MasonryGrid).length).toBe(0)
  })
})
