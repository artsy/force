import { ArtworkAuctionCreateAlertHeaderFragmentContainer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ArtworkAuctionCreateAlertHeader_Test_Query } from "__generated__/ArtworkAuctionCreateAlertHeader_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

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
})
