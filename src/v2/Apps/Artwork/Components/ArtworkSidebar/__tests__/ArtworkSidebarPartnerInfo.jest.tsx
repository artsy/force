import { ArtworkSidebarPartnerInfo_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebarPartnerInfo_Test_Query.graphql"
import {
  ArtworkFromPartnerWithLocations,
  ArtworkInNonAuctionSale,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarPartnerInfo", () => {
  const getWrapper = async (
    response: ArtworkSidebarPartnerInfo_Test_QueryRawResponse["artwork"]
  ) => {
    return await renderRelayTree({
      Component: ArtworkSidebarPartnerInfoFragmentContainer,
      query: graphql`
        query ArtworkSidebarPartnerInfo_Test_Query
          @raw_response_type
          @relay_test_operation {
          artwork(id: "artwork_from_partner_with_locations") {
            ...ArtworkSidebarPartnerInfo_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebarPartnerInfo_Test_QueryRawResponse,
    })
  }

  let artwork

  describe("Non-auction Sales display", () => {
    beforeEach(() => {
      artwork = Object.assign({}, ArtworkInNonAuctionSale)
    })

    it("displays sale name", async () => {
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain(artwork.sale.name)
      expect(
        wrapper.find({ href: artwork.sale.href }).hostNodes()
      ).toHaveLength(1)
    })
  })

  describe("Partners display", () => {
    beforeEach(() => {
      artwork = Object.assign({}, ArtworkFromPartnerWithLocations)
    })

    it("displays partner name", async () => {
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain(artwork.partner.name)
      expect(
        wrapper.find({ href: artwork.partner.href }).hostNodes()
      ).toHaveLength(1)
    })

    it("displays partner name without href", async () => {
      artwork.partner.href = null

      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain(artwork.partner.name)
      expect(wrapper.find({ href: artwork.partner.href }).length).toBe(0)
    })

    it("displays partner locations", async () => {
      const wrapper = await getWrapper(artwork)

      const text = wrapper.text()

      artwork.partner.locations.forEach(location => {
        expect(text).toContain(location.city)
      })
    })

    it("displays partner without locations", async () => {
      artwork.partner.locations = []

      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain(artwork.partner.name)
    })
  })
})
