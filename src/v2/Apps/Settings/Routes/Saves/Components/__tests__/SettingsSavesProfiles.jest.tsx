import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import {
  SettingsSavesProfilesPaginationContainer,
  SETTINGS_SAVES_PROFILES_QUERY,
} from "../SettingsSavesProfiles"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesProfilesPaginationContainer,
  query: SETTINGS_SAVES_PROFILES_QUERY,
})

describe("SettingsSavesProfiles", () => {
  it("renders correctly", () => {
    renderWithRelay({
      PageInfo: () => ({ hasNextPage: false, endCursor: null }),
      Partner: () => ({ name: "Example Profile" }),
    })

    expect(screen.getByText("Followed Profiles")).toBeInTheDocument()
    expect(screen.getByText("Example Profile")).toBeInTheDocument()
  })

  it("renders an empty state", () => {
    renderWithRelay({
      FollowedProfileConnection: () => ({
        edges: [],
      }),
    })

    expect(screen.getByText("Followed Profiles")).toBeInTheDocument()
    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
