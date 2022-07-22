import { render, screen, fireEvent } from "@testing-library/react"
import { HeadProvider } from "react-head"
import { parseTokenFromRouter, PreferencesApp } from "../PreferencesApp"

describe("PreferencesApp", () => {
  it.skip("renders the preference center", () => {
    render(
      <HeadProvider>
        <PreferencesApp></PreferencesApp>
      </HeadProvider>
    )

    expect(screen.getByText("Email Preference Center")).toBeInTheDocument()
    expect(
      screen.getByText("Please sign in to update your email preferences")
    ).not.toBeInTheDocument()
  })

  it("prompts users to sign in when no token and signed out", () => {
    render(
      <HeadProvider>
        <PreferencesApp></PreferencesApp>
      </HeadProvider>
    )

    expect(
      screen.getByText("Please sign in to update your email preferences")
    ).toBeInTheDocument()
  })

  it.skip("has disabled buttons until a change is made", () => {
    render(
      <HeadProvider>
        <PreferencesApp></PreferencesApp>
      </HeadProvider>
    )

    // eslint-disable-next-line testing-library/no-node-access
    let saveButton = screen.getByText("Save").closest("button")
    let checkboxes = screen.getAllByRole("checkbox")

    expect(saveButton).toBeDisabled()

    fireEvent.click(checkboxes[0])

    expect(saveButton).toBeEnabled()
  })

  it.skip("allows user to uncheck all boxes with unsubscribe from all", () => {
    render(
      <HeadProvider>
        <PreferencesApp></PreferencesApp>
      </HeadProvider>
    )

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

  it.skip("unchecks unsubscribe/subscribe all when other checkboxes are checked", () => {
    render(
      <HeadProvider>
        <PreferencesApp></PreferencesApp>
      </HeadProvider>
    )

    expect(screen.getByText("Unsubscribe from all")).toBeInTheDocument()

    let checkboxes = screen.getAllByRole("checkbox")
    let subscribeToAllCheckbox = checkboxes[0]
    let unsubscribeFromAllCheckbox = checkboxes.pop()

    fireEvent.click(checkboxes[3])

    expect(subscribeToAllCheckbox).not.toBeChecked()
    expect(unsubscribeFromAllCheckbox).not.toBeChecked()
  })

  it.skip("allows user to check all boxes with subscribe to all", () => {
    render(
      <HeadProvider>
        <PreferencesApp></PreferencesApp>
      </HeadProvider>
    )

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
