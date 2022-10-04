import { graphql } from "react-relay"
import { ArtistInfoFragmentContainer } from "Apps/Artwork/Components/ArtistInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

jest.mock("Components/ArtistMarketInsights", () => ({
  ArtistMarketInsightsFragmentContainer: () =>
    "ArtistMarketInsightsFragmentContainer",
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistInfoFragmentContainer,
  query: graphql`
    query ArtistInfo_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistInfo_artist
      }
    }
  `,
})

describe("ArtistInfo", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Example Artist",
        formattedNationalityAndBirthday: "American, b. 1980",
      }),
    })

    expect(screen.getByText("Example Artist")).toBeInTheDocument()
    expect(screen.getByText("American, b. 1980")).toBeInTheDocument()
    expect(
      screen.getByText("ArtistMarketInsightsFragmentContainer")
    ).toBeInTheDocument()
  })
})
