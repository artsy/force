import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SettingsSavesProfilesPaginationContainer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesProfiles"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesProfilesPaginationContainer,
  query: graphql`
    query SettingsSavesProfiles_test_Query($after: String)
      @relay_test_operation {
      me {
        ...SettingsSavesProfiles_me @arguments(after: $after)
      }
    }
  `,
})

describe("SettingsSavesProfiles", () => {
  it("renders correctly", () => {
    renderWithRelay({
      PageInfo: () => ({ hasNextPage: false, endCursor: null }),
      Partner: () => ({ name: "Example Profile" }),
    })

    expect(
      screen.getByText("Followed Galleries & Institutions")
    ).toBeInTheDocument()
    expect(screen.getByText("Example Profile")).toBeInTheDocument()
  })

  it("renders an empty state", () => {
    renderWithRelay({
      FollowedProfileConnection: () => ({
        edges: [],
      }),
    })

    expect(
      screen.getByText("Followed Galleries & Institutions")
    ).toBeInTheDocument()
    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
