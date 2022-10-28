import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SettingsSavesArtworksRefetchContainer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesArtworks"

jest.unmock("react-relay")

jest.mock("Components/Pagination", () => ({
  PaginationFragmentContainer: () => "PaginationFragmentContainer",
}))

jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
  Jump: ({ children }) => children,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesArtworksRefetchContainer,
  query: graphql`
    query SettingsSavesArtworks_test_Query($page: Int) @relay_test_operation {
      me {
        ...SettingsSavesArtworks_me @arguments(page: $page)
      }
    }
  `,
})

describe("SettingsSavesArtworks", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Artwork: () => ({ title: "Example Artwork" }),
    })

    expect(screen.getByText("Saved Artworks")).toBeInTheDocument()
    expect(screen.getByText("Example Artwork")).toBeInTheDocument()
  })

  it("renders an empty state", () => {
    renderWithRelay({
      SavedArtworksConnection: () => ({
        edges: [],
      }),
    })

    expect(screen.getByText("Saved Artworks")).toBeInTheDocument()
    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
