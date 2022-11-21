import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { ArtistAuctionResultItemTestQuery } from "__generated__/ArtistAuctionResultItemTestQuery.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({ match: { location: { pathname: "anything" } } }),
}))

describe("ArtistAuctionResultItem", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ArtistAuctionResultItemTestQuery
  >({
    Component: (props: any) => {
      const result = props.artist?.auctionResultsConnection?.edges?.[0]?.node

      return (
        <ArtistAuctionResultItemFragmentContainer
          auctionResult={result}
          filtersAtDefault={false}
          {...props}
        />
      )
    },
    query: graphql`
      query ArtistAuctionResultItemTestQuery {
        artist(id: "andy-warhol") {
          auctionResultsConnection(first: 1) {
            edges {
              node {
                ...ArtistAuctionResultItem_auctionResult
              }
            }
          }
        }
      }
    `,
  })

  it("renders the auction result data", () => {
    renderWithRelay(mockResolver, false)

    expect(
      screen.getByText("Neuschwanstein (Feldmann & Schellmann 372), 1987")
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Offset lithographic poster with screenprint in colours, on wove paper"
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Bonhams")).toBeInTheDocument()

    expect(screen.queryByText("Andy Warhol")).not.toBeInTheDocument()
  })

  describe("when showArtistName is true", () => {
    it("renders artist name with the auction result data", () => {
      renderWithRelay(mockResolver, false, { showArtistName: true })

      expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
      expect(
        screen.getByText("Neuschwanstein (Feldmann & Schellmann 372)")
      ).toBeInTheDocument()
      expect(screen.getByText(", 1987")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Offset lithographic poster with screenprint in colours, on wove paper"
        )
      ).toBeInTheDocument()
      expect(screen.getByText("Bonhams")).toBeInTheDocument()
    })
  })
})

const mockResolver = {
  AuctionResult: () => ({
    title: "Neuschwanstein (Feldmann & Schellmann 372)",
    dimension_text: "62.0 x 91.0 cm",
    organization: "Bonhams",
    artist: {
      name: "Andy Warhol",
    },
    mediumText:
      "Offset lithographic poster with screenprint in colours, on wove paper",
    categoryText: "Print",
    date_text: "1987",
    saleDate: "2022-09-21T00:00:00.000Z",
  }),
}
