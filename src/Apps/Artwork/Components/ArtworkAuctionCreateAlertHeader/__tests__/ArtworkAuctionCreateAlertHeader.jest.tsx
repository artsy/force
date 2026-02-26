import { fireEvent, screen } from "@testing-library/react"
import { ArtworkAuctionCreateAlertHeaderFragmentContainer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtworkAuctionCreateAlertHeader_Test_Query } from "__generated__/ArtworkAuctionCreateAlertHeader_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "artwork-id",
    contextPageOwnerSlug: "artwork-slug",
    contextPageOwnerType: "artwork",
  })),
}))

const { renderWithRelay } =
  setupTestWrapperTL<ArtworkAuctionCreateAlertHeader_Test_Query>({
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
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("displays when the auction is closed", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Untitled",
        artistNames: "Emily Ludwig Shaffer",
        artists: [{ id: "emily-ludwig-shaffer" }],
        isInAuction: true,
        isEligibleToCreateAlert: true,
      }),
      Sale: () => ({
        isClosed: true,
      }),
    })

    expect(screen.queryByText("Untitled")).toBeInTheDocument()
    expect(screen.queryByText(/Emily Ludwig Shaffer/)).toBeInTheDocument()
    expect(screen.getByText("Manage your alerts")).toBeInTheDocument()
  })

  it("does not display when the auction is open", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Untitled",
        artistNames: "Emily Ludwig Shaffer",
        artists: [{ id: "emily-ludwig-shaffer" }],
        isInAuction: true,
        isEligibleToCreateAlert: true,
      }),
      Sale: () => ({
        isClosed: false,
      }),
      SaleArtwork: () => ({
        endedAt: null,
      }),
    })

    expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
  })

  it("does not display when the artwork is not an auction artwork", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Untitled",
        artistNames: "Emily Ludwig Shaffer",
        artists: [{ id: "emily-ludwig-shaffer" }],
        isInAuction: false,
        isEligibleToCreateAlert: true,
      }),
      Sale: () => ({}),
      SaleArtwork: () => ({}),
    })

    expect(screen.queryByText("Manage your alerts")).not.toBeInTheDocument()
  })

  it("tracks click on 'Manage your alerts' button", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Untitled",
        artistNames: "Emily Ludwig Shaffer",
        artists: [{ id: "emily-ludwig-shaffer" }],
        isInAuction: true,
        isEligibleToCreateAlert: true,
      }),
      Sale: () => ({
        isClosed: true,
      }),
    })

    fireEvent.click(screen.getByText("Manage your alerts"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "artworkClosedLotHeader",
      context_page_owner_id: "artwork-id",
      context_page_owner_slug: "artwork-slug",
      context_page_owner_type: "artwork",
      destination_page_owner_type: "saves",
      type: "viewAll",
    })
  })
})
