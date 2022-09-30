import { screen } from "@testing-library/react"
import { ArtistInsightBadgesFragmentContainer } from "../ArtistInsightBadges"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
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
        insightBadges: [
          {
            label: "The FooBar Vanguard",
            description: "Appeared in 2020 Vangard",
          },
          {
            label: "FooBar Secondary Market",
            description: "Very active market",
          },
          {
            label: "High Auction Record",
            description: "US$93.1m, Christies, 2021",
          },
        ],
      }),
    })

    expect(screen.getByText("FooBar Secondary Market")).toBeInTheDocument()
    expect(screen.getByText("Appeared in 2020 Vangard")).toBeInTheDocument()

    expect(screen.getByText("The FooBar Vanguard")).toBeInTheDocument()
    expect(screen.getByText("Very active market")).toBeInTheDocument()

    expect(screen.getByText("High Auction Record")).toBeInTheDocument()
    expect(screen.getByText("US$93.1m, Christies, 2021")).toBeInTheDocument()
  })
})
