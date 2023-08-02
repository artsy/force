import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkAuctionCreateAlertHeaderFragmentContainer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertHeader"
import { ArtworkAuctionCreateAlertHeader_Test_Query } from "__generated__/ArtworkAuctionCreateAlertHeader_Test_Query.graphql"

jest.unmock("react-relay")

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
  it("displays title, artist name(s) and cta", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Untitled",
        artistNames: "Emily Ludwig Shaffer",
      }),
    })

    expect(screen.queryByText("Untitled")).toBeInTheDocument()
    expect(screen.queryByText(/Emily Ludwig Shaffer/)).toBeInTheDocument()
    expect(screen.getByText("Create Alert")).toBeInTheDocument()
  })
})
