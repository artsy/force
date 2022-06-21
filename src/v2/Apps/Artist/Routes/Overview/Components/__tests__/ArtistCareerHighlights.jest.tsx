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
  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        insights: [
          {
            type: "ACTIVE_SECONDARY_MARKET",
          },
        ],
      }),
    })

    expect(screen.getByText("Career Highlights")).toBeInTheDocument()
    expect(screen.getByText("Artist Badges")).toBeInTheDocument()
    expect(screen.getByText("Active Secondary Market")).toBeInTheDocument()
  })
})
