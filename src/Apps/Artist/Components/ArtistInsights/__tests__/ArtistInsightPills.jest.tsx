import { screen } from "@testing-library/react"
import { ArtistInsightPillsFragmentContainer } from "Apps/Artist/Components/ArtistInsights/ArtistInsightPills"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
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
        insightPills: [
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
    expect(screen.getByText("The FooBar Vanguard")).toBeInTheDocument()
    expect(screen.getByText("High Auction Record")).toBeInTheDocument()
  })
})
