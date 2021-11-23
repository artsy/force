import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import {
  SettingsSavesArtistsPaginationContainer,
  SETTINGS_SAVES_ARTISTS_QUERY,
} from "../SettingsSavesArtists"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesArtistsPaginationContainer,
  query: SETTINGS_SAVES_ARTISTS_QUERY,
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
