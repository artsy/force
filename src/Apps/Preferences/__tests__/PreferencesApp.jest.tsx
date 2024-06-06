import { fireEvent, screen } from "@testing-library/react"
import {
  PreferencesAppFragmentContainer,
  parseTokenFromRouter,
} from "Apps/Preferences/PreferencesApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { PreferencesAppTestQuery } from "__generated__/PreferencesAppTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("PreferencesApp", () => {
  const { renderWithRelay } = setupTestWrapperTL<PreferencesAppTestQuery>({
    Component: props => <PreferencesAppFragmentContainer {...(props as any)} />,
    query: graphql`
      query PreferencesAppTestQuery @relay_test_operation {
        viewer {
          ...PreferencesApp_viewer
        }
      }
    `,
  })

  it("renders the preference center", () => {
    renderWithRelay({
      Viewer: () => ({ notificationPreferences: mockPreferences }),
    })

    expect(screen.getByText("Email Preference Center")).toBeInTheDocument()
    expect(
      screen.queryByText("Please sign in to update your email preferences")
    ).not.toBeInTheDocument()
  })

  it("prompts users to sign in when no token and signed out", () => {
    renderWithRelay({
      Viewer: () => ({ notificationPreferences: null }),
    })

    expect(
      screen.getByText("Please sign in to update your email preferences")
    ).toBeInTheDocument()
  })

  it("has disabled buttons until a change is made", () => {
    renderWithRelay({
      Viewer: () => ({ notificationPreferences: mockPreferences }),
    })

    let saveButton = screen.getByRole("button", { name: "Save" })
    let checkboxes = screen.getAllByRole("checkbox")

    expect(saveButton).toBeDisabled()

    fireEvent.click(checkboxes[0])

    expect(saveButton).toBeEnabled()
  })

  it("allows user to uncheck all boxes with unsubscribe from all", () => {
    renderWithRelay({
      Viewer: () => ({ notificationPreferences: mockPreferences }),
    })

    expect(screen.getByText("Subscribe to all")).toBeInTheDocument()

    let checkboxes = screen.getAllByRole("checkbox")
    let unsubscribeFromAllCheckbox = checkboxes.pop()!

    fireEvent.click(checkboxes[3])
    fireEvent.click(checkboxes[4])

    fireEvent.click(unsubscribeFromAllCheckbox)

    expect(unsubscribeFromAllCheckbox).toBeChecked()

    checkboxes?.forEach(checkbox => {
      expect(checkbox).not.toBeChecked()
    })
  })

  it("unchecks unsubscribe/subscribe all when other checkboxes are checked", () => {
    renderWithRelay({
      Viewer: () => ({ notificationPreferences: mockPreferences }),
    })

    expect(screen.getByText("Unsubscribe from all")).toBeInTheDocument()

    let checkboxes = screen.getAllByRole("checkbox")
    let subscribeToAllCheckbox = checkboxes[0]
    let unsubscribeFromAllCheckbox = checkboxes.pop()

    fireEvent.click(checkboxes[3])

    expect(subscribeToAllCheckbox).not.toBeChecked()
    expect(unsubscribeFromAllCheckbox).not.toBeChecked()
  })

  it("allows user to check all boxes with subscribe to all", () => {
    renderWithRelay({
      Viewer: () => ({ notificationPreferences: mockPreferences }),
    })

    expect(screen.getByText("Unsubscribe from all")).toBeInTheDocument()

    let checkboxes = screen.getAllByRole("checkbox")
    let subscribeToAllCheckbox = checkboxes[0]
    let unsubscribeFromAllCheckbox = checkboxes.pop()

    fireEvent.click(subscribeToAllCheckbox)

    expect(subscribeToAllCheckbox).toBeChecked()

    expect(unsubscribeFromAllCheckbox).not.toBeChecked()

    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked()
    })

    fireEvent.click(subscribeToAllCheckbox)

    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked()
    })
  })
})

describe("parseTokenFromRouter", () => {
  it("returns an empty string without a query", () => {
    const router = {}
    const authenticationToken = parseTokenFromRouter(router)
    expect(authenticationToken).toEqual("")
  })

  it("returns the token from the query", () => {
    const token = "abcd1234"
    const query = { authentication_token: token }
    const router = { match: { location: { query } } }
    const authenticationToken = parseTokenFromRouter(router)
    expect(authenticationToken).toEqual(token)
  })

  it("returns the token from the query and cleans up any malformed values", () => {
    const token = "abcd1234"
    const query = { authentication_token: `${token}?foo=bar` }
    const router = { match: { location: { query } } }
    const authenticationToken = parseTokenFromRouter(router)
    expect(authenticationToken).toEqual(token)
  })
})

const mockPreferences = [
  { name: "custom_alerts", status: "SUBSCRIBED" },
  { name: "partner_offers_on_saves", status: "SUBSCRIBED" },
  { name: "product_updates", status: "SUBSCRIBED" },
  { name: "art_world_insights", status: "UNSUBSCRIBED" },
  { name: "guidance_on_collecting", status: "UNSUBSCRIBED" },
  { name: "recommended_by_artsy", status: "UNSUBSCRIBED" },
]
