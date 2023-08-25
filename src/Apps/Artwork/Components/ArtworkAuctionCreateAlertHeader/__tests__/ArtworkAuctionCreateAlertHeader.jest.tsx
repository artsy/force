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
  describe("with the feature flag enabled", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)
    })

    it("displays when the auction is closed", () => {
      renderWithRelay({
        Artwork: () => ({
          title: "Untitled",
          artistNames: "Emily Ludwig Shaffer",
          artists: [{ id: "emily-ludwig-shaffer" }],
          isInAuction: true,
        }),
        Sale: () => ({
          isClosed: true,
        }),
      })

      expect(screen.queryByText("Untitled")).toBeInTheDocument()
      expect(screen.queryByText(/Emily Ludwig Shaffer/)).toBeInTheDocument()
      expect(screen.getByText("Create Alert")).toBeInTheDocument()
    })

    it("does not display when the auction is open", () => {
      renderWithRelay({
        Artwork: () => ({
          title: "Untitled",
          artistNames: "Emily Ludwig Shaffer",
          artists: [{ id: "emily-ludwig-shaffer" }],
          isInAuction: true,
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
        }),
        Sale: () => ({}),
        SaleArtwork: () => ({}),
      })

      expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
    })

    describe("suggested artworks section", () => {
      it("displays when there are suggested artworks", () => {
        renderWithRelay({
          Artwork: () => ({
            title: "Untitled",
            artistNames: "Emily Ludwig Shaffer",
            artists: [{ id: "emily-ludwig-shaffer" }],
            isInAuction: true,
            savedSearch: {
              suggestedArtworksConnection: {
                totalCount: 1,
              },
            },
          }),
          Sale: () => ({
            isClosed: true,
          }),
        })

        expect(
          screen.queryByText(/You may be interested in these similar works/)
        ).toBeInTheDocument()
      })

      it("doesn't display when there are no suggested artworks", () => {
        renderWithRelay({
          Artwork: () => ({
            title: "Untitled",
            artistNames: "Emily Ludwig Shaffer",
            artists: [{ id: "emily-ludwig-shaffer" }],
            isInAuction: true,
            savedSearch: {
              suggestedArtworksConnection: {
                totalCount: 0,
              },
            },
          }),
          Sale: () => ({
            isClosed: true,
          }),
        })

        expect(
          screen.queryByText(/You may be interested in these similar works/)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("with the feture flag disabled", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
    })
    it("does not display when the auction is closed", () => {
      renderWithRelay({
        Artwork: () => ({
          title: "Untitled",
          artistNames: "Emily Ludwig Shaffer",
          artists: [{ id: "emily-ludwig-shaffer" }],
          isInAuction: true,
        }),
        Sale: () => ({
          isClosed: true,
        }),
      })

      expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
    })
  })
})
