import { ArtworkSidebarAuctionPartnerInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ArtworkSidebarAuctionPartnerInfoTestQuery$rawResponse } from "__generated__/ArtworkSidebarAuctionPartnerInfoTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarAuctionPartnerInfo", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <ArtworkSidebarAuctionPartnerInfoFragmentContainer
        artwork={props.artwork}
      />
    ),
    query: graphql`
      query ArtworkSidebarAuctionPartnerInfoTestQuery
      @raw_response_type
      @relay_test_operation {
        artwork(id: "auction_artwork_estimate_premium") {
          ...ArtworkSidebarAuctionPartnerInfo_artwork
        }
      }
    `,
  })

  describe("ArtworkSidebarAuctionPartnerInfo", () => {
    it("displays partner name and estimate", () => {
      renderWithRelay({
        Artwork: () => ArtworkWithEstimateAndPremium,
      })

      expect(screen.getByText("Bruun Rasmussen")).toBeInTheDocument()
      expect(
        screen.getByText("Estimated value: DKK 100,000–DKK 125,000")
      ).toBeInTheDocument()
    })

    it.skip("displays artwork without premium", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkWithEstimateAndPremium,
          sale: {
            ...(ArtworkWithEstimateAndPremium?.sale || {}),
            // FIXME: This selection doesn't seem to exist, is this test obsolete?
            // is_with_buyers_premium: null,
          },
        }),
      })

      expect(screen.queryByText("buyer's premium")).not.toBeInTheDocument()
    })

    it("displays artwork without estimate", () => {
      renderWithRelay({
        Artwork: () => ({
          ...ArtworkWithEstimateAndPremium,
          sale_artwork: {
            ...(ArtworkWithEstimateAndPremium?.sale_artwork || {}),
            estimate: null,
          },
        }),
      })

      expect(screen.queryByText("Estimated value")).not.toBeInTheDocument()
    })

    it("does not display anything for closed auctions", () => {
      const { container } = renderWithRelay({
        Artwork: () => ({
          ...ArtworkWithEstimateAndPremium,
          sale: {
            ...(ArtworkWithEstimateAndPremium?.sale || {}),
            is_closed: true,
          },
        }),
      })
      expect(container.firstChild).toBeFalsy()
    })
  })
})

const ArtworkWithEstimateAndPremium: ArtworkSidebarAuctionPartnerInfoTestQuery$rawResponse["artwork"] =
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
