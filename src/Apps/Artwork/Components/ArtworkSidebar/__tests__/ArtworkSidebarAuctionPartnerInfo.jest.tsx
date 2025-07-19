import { screen } from "@testing-library/react"
import { ArtworkSidebarAuctionPartnerInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import { renderRelayTree } from "DevTools/renderRelayTree"
import type { ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse } from "__generated__/ArtworkSidebarAuctionPartnerInfo_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarAuctionPartnerInfo", () => {
  const getWrapper = async (
    response: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"],
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
      await getWrapper(ArtworkWithEstimateAndPremium)

      expect(screen.getByText("Bruun Rasmussen")).toBeInTheDocument()
      expect(
        screen.getByText("Estimated value: DKK 100,000–DKK 125,000"),
      ).toBeInTheDocument()
    })

    it.skip("displays artwork without premium", async () => {
      await getWrapper({
        ...ArtworkWithEstimateAndPremium,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sale: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ...ArtworkWithEstimateAndPremium.sale,
          // FIXME: This selection doesn't seem to exist, is this test obsolete?
          // is_with_buyers_premium: null,
        },
      })

      expect(screen.queryByText("buyer's premium")).not.toBeInTheDocument()
    })

    it("displays artwork without estimate", async () => {
      await getWrapper({
        ...ArtworkWithEstimateAndPremium,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sale_artwork: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ...ArtworkWithEstimateAndPremium.sale_artwork,
          estimate: null,
        },
      })

      expect(screen.queryByText("Estimated value")).not.toBeInTheDocument()
    })

    it("does not display anything for closed auctions", async () => {
      const { container } = await getWrapper({
        ...ArtworkWithEstimateAndPremium,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sale: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ...ArtworkWithEstimateAndPremium.sale,
          is_closed: true,
        },
      })
      expect(container.firstChild).toBeFalsy()
    })
  })
})

const ArtworkWithEstimateAndPremium: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"] =
  {
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
