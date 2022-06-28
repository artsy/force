import { screen } from "@testing-library/react"
import { ArtistInsightBadgesFragmentContainer } from "../ArtistInsightBadges"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistInsightBadgesFragmentContainer,
  query: graphql`
    query ArtistInsightBadges_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistInsightBadges_artist
      }
    }
  `,
})

describe("ArtistInsightBadges", () => {
  it("renders artist insight badges", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [
          {
            label: "The FooBar Vanguard",
          },
          {
            label: "FooBar Secondary Market",
          },
        ],
        auctionResultsConnection: {
          edges: [
            {
              node: {
                priceRealized: {
                  display: "US$93.1m",
                },
                organization: "Christies",
                saleDate: "2021",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("High Auction Record")).toBeInTheDocument()
    expect(screen.getByText("FooBar Secondary Market")).toBeInTheDocument()
    expect(screen.getByText("The FooBar Vanguard")).toBeInTheDocument()
  })

  it("renders high auction record correctly", () => {
    renderWithRelay({
      Artist: () => ({
        auctionResultsConnection: {
          edges: [
            {
              node: {
                priceRealized: {
                  display: "US$100m",
                },
                organization: "Foos",
                saleDate: "1990",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("US$100m, Foos, 1990")).toBeInTheDocument()
  })

  it("does not render high auction record if not present on artist", () => {
    renderWithRelay({
      Artist: () => ({
        auctionResultsConnection: null,
      }),
    })

    expect(screen.queryByText("High Auction Record")).not.toBeInTheDocument()
  })
})
