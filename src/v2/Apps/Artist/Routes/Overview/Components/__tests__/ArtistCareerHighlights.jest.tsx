import { graphql } from "react-relay"
import { ArtistCareerHighlightsFragmentContainer } from "../ArtistCareerHighlights"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistCareerHighlightsFragmentContainer,
  query: graphql`
    query ArtistCareerHighlights_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistCareerHighlights_artist
      }
    }
  `,
})

describe("ArtistCareerHighlights", () => {
  it("renders Career Highlights correctly", () => {
    renderWithRelay({
      Artist: () => ({
        insightAchievements: [
          {
            label: "Solo show at a major institution",
            entities: ["Foo Museum"],
            kind: "SOLO_SHOW",
          },
        ],
      }),
    })

    expect(screen.getByText("Career Highlights")).toBeInTheDocument()
    expect(
      screen.getByText("Solo show at a major institution")
    ).toBeInTheDocument()
    expect(screen.getByText("Foo Museum")).toBeInTheDocument()
  })

  it("renders Artist Badges correctly", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [
          {
            label: "Active Secondary Market",
            entities: [],
            description: "Recent auction results in the Artsy Price Database",
            kind: "ACTIVE_SECONDARY_MARKET",
          },
        ],
      }),
    })

    expect(screen.getByText("Active Secondary Market")).toBeInTheDocument()
    expect(
      screen.getByText("Recent auction results in the Artsy Price Database")
    ).toBeInTheDocument()
  })
})
