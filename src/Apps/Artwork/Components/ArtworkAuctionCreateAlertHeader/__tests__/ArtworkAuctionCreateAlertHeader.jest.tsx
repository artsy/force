import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkAuctionCreateAlertHeaderFragmentContainer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertHeader"
import { ArtworkAuctionCreateAlertHeader_Test_Query } from "__generated__/ArtworkAuctionCreateAlertHeader_Test_Query.graphql"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.unmock("react-relay")

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkAuctionCreateAlertHeader_Test_Query
>({
  Component: ({ artwork }) => {
    return (
      <ArtworkAuctionCreateAlertHeaderFragmentContainer artwork={artwork!} />
    )
  },
  query: graphql`
    query ArtworkAuctionCreateAlertHeader_Test_Query @relay_test_operation {
      artwork(id: "emily-ludwig-shaffer-untitled-3") {
        ...ArtworkAuctionCreateAlertHeader_artwork
      }
    }
  `,
})

describe("ArtworkAuctionCreateAlertHeader", () => {
  describe("feature flag onyx_auction-header-alert-cta enabled", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)
    })

    it("displays title and cta", () => {
      renderWithRelay({
        Artwork: () => ({
          title: "Untitled",
          artistNames: "Emily Ludwig Shaffer",
        }),
      })

      expect(screen.queryByText("Untitled")).toBeInTheDocument()
      expect(
        screen.queryByText(/Emily Ludwig Shaffer has ended/)
      ).toBeInTheDocument()
      expect(screen.queryByText("Create Alert")).toBeInTheDocument()
    })
  })

  describe("feature flag onyx_auction-header-alert-cta disabled", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
    })
    it("hides title and cta", () => {
      renderWithRelay({
        Artwork: () => ({
          title: "Untitled",
          artistNames: "Emily Ludwig Shaffer",
        }),
      })

      expect(screen.queryByText("Untitled")).not.toBeInTheDocument()
      expect(
        screen.queryByText(/Emily Ludwig Shaffer has ended/)
      ).not.toBeInTheDocument()
      expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
    })
  })
})
