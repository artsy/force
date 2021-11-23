import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import {
  SettingsSavesCategoriesPaginationContainer,
  SETTINGS_SAVES_CATEGORIES_QUERY,
} from "../SettingsSavesCategories"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsSavesCategoriesPaginationContainer,
  query: SETTINGS_SAVES_CATEGORIES_QUERY,
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
