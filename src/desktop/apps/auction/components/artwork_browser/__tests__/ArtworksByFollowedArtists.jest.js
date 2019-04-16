import ArtworksByFollowedArtists from "../ArtworksByFollowedArtists"
import MasonryGrid from "desktop/components/react/masonry_grid/MasonryGrid"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { ArtworkRail } from "../../artwork_rail/ArtworkRail"
import { followedArtistSaleArtworks } from "../__tests__/fixtures/followedArtistSaleArtworks"
import { cloneDeep } from "lodash"

xdescribe("auction/components/artwork_browser/BuyNowSaleArtworks", () => {
  const data = {
    app: {
      isMobile: false,
      auction: {
        name: "An Auction",
        sale_type: "auction promo",
        eligible_sale_artworks_count: 0,
      },
    },
    artworkBrowser: {
      saleArtworksByFollowedArtists: followedArtistSaleArtworks,
    },
  }

  it("renders a <ArtworkRail /> on desktop", () => {
    const { wrapper } = renderTestComponent({
      Component: ArtworksByFollowedArtists,
      data,
      props: {
        followedArtistSaleArtworks,
      },
    })

    expect(wrapper.html()).toMatch("Works By Artists You Follow")
    expect(wrapper.find(ArtworkRail).length).toBe(1)
  })

  it("renders a <MasonryGrid /> on mobile", () => {
    let mobileData = cloneDeep(data)
    mobileData.app.isMobile = true

    const { wrapper } = renderTestComponent({
      Component: ArtworksByFollowedArtists,
      data: mobileData,
      props: {
        followedArtistSaleArtworks,
      },
    })

    expect(wrapper.html()).toMatch("Works By Artists You Follow")
    expect(wrapper.find(MasonryGrid).length).toBe(1)
  })
})
