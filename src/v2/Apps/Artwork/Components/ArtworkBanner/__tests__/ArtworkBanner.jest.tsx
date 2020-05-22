import { ArtworkBanner_Test_QueryRawResponse } from "v2/__generated__/ArtworkBanner_Test_Query.graphql"
import {
  ArtworkAuctionBannerFixture,
  ArtworkBenefitAuctionBannerFixture,
  ArtworkFairBannerFixture,
  ArtworkNoBannerFixture,
  ArtworkUpcomingShowBannerFixture,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkBanner"
import { ArtworkBannerFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkBanner"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkBanner", () => {
  const getWrapper = async (
    response: ArtworkBanner_Test_QueryRawResponse["artwork"]
  ) => {
    return await renderRelayTree({
      Component: ArtworkBannerFragmentContainer,
      query: graphql`
        query ArtworkBanner_Test_Query @raw_response_type {
          artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
            ...ArtworkBanner_artwork
          }
        }
      `,
      mockData: { artwork: response } as ArtworkBanner_Test_QueryRawResponse,
    })
  }

  let wrapper

  describe("ArtworkBanner for artwork with no banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkNoBannerFixture)
    })
    it("renders nothing", () => {
      const html = wrapper.html()
      expect(html).toBeFalsy()
    })
  })

  describe("ArtworkBanner for artwork with regular auction banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkAuctionBannerFixture)
    })
    it("renders a correct data for the auction", () => {
      const html = wrapper.html()

      expect(html).toContain("In auction")
      // expect(html).toContain("Doyle: Post-War & Contemporary Art")
      expect(html).toContain(
        "https://d32dm0rphc51dk.cloudfront.net/teoB9Znrq-78iSh6_Vh6Og/square.jpg"
      )
      expect(html).toContain("Doyle")
    })
  })

  describe("ArtworkBanner for artwork with benefit auction banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkBenefitAuctionBannerFixture)
    })
    it("renders a correct data for the auction", () => {
      const html = wrapper.html()

      expect(html).toContain("In auction")
      // expect(html).toContain("BFAMI: Live Benefit Auction 2019")
      expect(html).toContain(
        "https://d32dm0rphc51dk.cloudfront.net/0XJ7rzO9dlu60lXl2OuH6g/square.jp"
      )
      expect(html).not.toContain(
        "BFAMI: Live Benefit Auction 2019 partner name"
      )
    })
  })

  describe("ArtworkBanner for artwork with fair banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkFairBannerFixture)
    })

    it("renders a correct data for the fair", () => {
      const html = wrapper.html()
      expect(html).toContain("At fair")
      // expect(html).toContain("West Bund Art & Design 2018")
      expect(html).toContain("White Cube")
    })
  })

  describe("ArtworkBanner for artwork with partner show banner", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(ArtworkUpcomingShowBannerFixture)
    })

    it("renders a correct data for the show", () => {
      const html = wrapper.html()
      expect(html).toContain("In upcoming show")
      // expect(html).toContain("Claudia Giraudo | The age of innocence")
      expect(html).toContain("Galleria Punto Sull'Arte")
    })
  })
})
