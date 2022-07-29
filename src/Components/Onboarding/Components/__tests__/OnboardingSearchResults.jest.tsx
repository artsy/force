import { OnboardingSearchResultsFragmentContainer } from "../OnboardingSearchResults"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")
jest.mock("Components/EntityHeaders/EntityHeaderArtist", () => {
  return {
    EntityHeaderArtistFragmentContainer: () => <div>Test Artist</div>,
  }
})
jest.mock("Components/EntityHeaders/EntityHeaderPartner", () => {
  return {
    EntityHeaderPartnerFragmentContainer: () => <div>Test Gallery</div>,
  }
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    if (!(props as { viewer: any }).viewer) return null

    return (
      <OnboardingSearchResultsFragmentContainer
        term="abc"
        viewer={(props as { viewer: any }).viewer}
      />
    )
  },
  query: graphql`
    query OnboardingSearchResults_Test_Query @relay_test_operation {
      viewer {
        ...OnboardingSearchResults_viewer
      }
    }
  `,
})

describe("OnboardingSearchResults", () => {
  it("shows no results if none found", () => {
    renderWithRelay({
      Viewer: () => ({
        matchConnection: {
          edges: [],
        },
      }),
    })

    expect(
      screen.getByText(
        'Sorry, we couldn’t find anything for "abc". Please try searching again with a different spelling.'
      )
    ).toBeInTheDocument()
  })

  it("renders search results for artists correctly", () => {
    renderWithRelay({
      Viewer: () => ({
        matchConnection: {
          edges: [{ node: { __typename: "Artist" } }],
        },
      }),
    })

    expect(screen.getByText("Test Artist")).toBeInTheDocument()
  })

  it("renders search results for galleries correctly", () => {
    renderWithRelay({
      Viewer: () => ({
        matchConnection: {
          edges: [{ node: { __typename: "Profile" } }],
        },
      }),
    })

    expect(screen.getByText("Test Gallery")).toBeInTheDocument()
  })
})
