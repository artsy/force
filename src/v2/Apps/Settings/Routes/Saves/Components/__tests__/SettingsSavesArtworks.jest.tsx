import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import {
  SettingsSavesArtworksRefetchContainer,
  SETTINGS_SAVES_ARTWORKS_QUERY,
} from "../SettingsSavesArtworks"

jest.unmock("react-relay")

jest.mock("v2/Components/Pagination", () => ({
  PaginationFragmentContainer: () => "PaginationFragmentContainer",
}))

jest.mock("v2/Utils/Hooks/useScrollTo", () => ({
  useScrollTo: () => ({ scrollTo: jest.fn() }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesArtworksRefetchContainer,
  query: SETTINGS_SAVES_ARTWORKS_QUERY,
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
