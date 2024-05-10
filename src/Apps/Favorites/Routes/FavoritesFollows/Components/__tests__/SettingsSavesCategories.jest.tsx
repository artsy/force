import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SettingsSavesCategoriesPaginationContainer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesCategories"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesCategoriesPaginationContainer,
  query: graphql`
    query SettingsSavesCategories_test_Query($after: String)
      @relay_test_operation {
      me {
        ...SettingsSavesCategories_me @arguments(after: $after)
      }
    }
  `,
})

describe("SettingsSavesCategories", () => {
  it("renders correctly", () => {
    renderWithRelay({
      PageInfo: () => ({ hasNextPage: false, endCursor: null }),
      Gene: () => ({ name: "Example Category" }),
    })

    expect(screen.getByText("Followed Categories")).toBeInTheDocument()
    expect(screen.getByText("Example Category")).toBeInTheDocument()
  })

  it("renders an empty state", () => {
    renderWithRelay({
      FollowGeneConnection: () => ({
        edges: [],
      }),
    })

    expect(screen.getByText("Followed Categories")).toBeInTheDocument()
    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
