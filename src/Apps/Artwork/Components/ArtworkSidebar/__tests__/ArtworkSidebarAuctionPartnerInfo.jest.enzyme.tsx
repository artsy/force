import { ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse } from "__generated__/ArtworkSidebarAuctionPartnerInfo_Test_Query.graphql"
import { ArtworkSidebarAuctionPartnerInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import { renderRelayTree } from "DevTools/renderRelayTree"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarAuctionPartnerInfo", () => {
  const getWrapper = async (
    response: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"]
  ) => {
    return renderRelayTree({
      Component: ArtworkSidebarAuctionPartnerInfoFragmentContainer,
      query: graphql`
        query ArtworkSidebarAuctionPartnerInfo_Test_Query
          @raw_response_type
          @relay_test_operation {
          artwork(id: "auction_artwork_estimate_premium") {
            ...ArtworkSidebarAuctionPartnerInfo_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse,
    })
  }

  describe("ArtworkSidebarAuctionPartnerInfo", () => {
    it("displays partner name and estimate", async () => {
      const wrapper = await getWrapper(ArtworkWithEstimateAndPremium)

      expect(wrapper.text()).toContain("Bruun Rasmussen")
      expect(wrapper.text()).toContain(
        "Estimated value: DKK 100,000–DKK 125,000"
      )
    })

    it.skip("displays artwork without premium", async () => {
      const wrapper = await getWrapper({
        ...ArtworkWithEstimateAndPremium,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sale: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ...ArtworkWithEstimateAndPremium.sale,
          // FIXME: This selection doesn't seem to exist, is this test obsolete?
          // is_with_buyers_premium: null,
        },
      })

      expect(wrapper.text()).not.toContain("buyer's premium")
    })

    it("displays artwork without estimate", async () => {
      const wrapper = await getWrapper({
        ...ArtworkWithEstimateAndPremium,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sale_artwork: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ...ArtworkWithEstimateAndPremium.sale_artwork,
          estimate: null,
        },
      })

      expect(wrapper.text()).not.toContain("Estimated value")
    })

    it("does not display anything for closed auctions", async () => {
      const wrapper = await getWrapper({
        ...ArtworkWithEstimateAndPremium,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sale: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ...ArtworkWithEstimateAndPremium.sale,
          is_closed: true,
        },
      })
      expect(wrapper.html()).toBeFalsy()
    })
  })
})

const ArtworkWithEstimateAndPremium: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"] = {
  id: "auction_artwork_estimate_premium",
  partner: {
    id: "5a84a434275b247345983eac",
    name: "Bruun Rasmussen",
  },
  sale_artwork: {
    id: "sdfsdf",
    estimate: "DKK 100,000–DKK 125,000",
  },
  sale: {
    internalID: "5bedc643023c175c11b9ee9c",
    id: "sdf",
    is_closed: false,
  },
}
