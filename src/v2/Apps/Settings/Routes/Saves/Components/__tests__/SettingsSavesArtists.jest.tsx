import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SettingsSavesArtistsPaginationContainer } from "../SettingsSavesArtists"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesArtistsPaginationContainer,
  query: graphql`
    query SettingsSavesArtists_test_Query($after: String)
      @relay_test_operation {
      me {
        ...SettingsSavesArtists_me @arguments(after: $after)
      }
    }
  `,
})

describe("SettingsSavesArtists", () => {
  it("renders correctly", () => {
    renderWithRelay({
      PageInfo: () => ({ hasNextPage: false, endCursor: null }),
      Artist: () => ({ name: "Example Artist" }),
    })

    expect(screen.getByText("Followed Artists")).toBeInTheDocument()
    expect(screen.getByText("Example Artist")).toBeInTheDocument()
  })

  it("renders an empty state", () => {
    renderWithRelay({
      FollowArtistConnection: () => ({
        edges: [],
      }),
    })

    expect(screen.getByText("Followed Artists")).toBeInTheDocument()
    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
