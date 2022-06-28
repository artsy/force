import { screen } from "@testing-library/react"
import { ArtistInsightPillsFragmentContainer } from "../ArtistInsightPills"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.mock("v2/Utils/Hooks/useScrollTo", () => ({
  useScrollTo: () => ({ scrollTo: jest.fn() }),
}))
jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistInsightPillsFragmentContainer,
  query: graphql`
    query ArtistInsightPills_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistInsightPills_artist
      }
    }
  `,
})

describe("ArtistInsightPills", () => {
  it("renders artist insight pills", () => {
    renderWithRelay({
      Artist: () => ({
        insightsList: [
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
                price_realized: {
                  display: "US$93.1m",
                },
                organization: "Christies",
                sale_date: "2021",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("FooBar Secondary Market")).toBeInTheDocument()
    expect(screen.getByText("The FooBar Vanguard")).toBeInTheDocument()
    expect(screen.getByText("High Auction Record")).toBeInTheDocument()
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
