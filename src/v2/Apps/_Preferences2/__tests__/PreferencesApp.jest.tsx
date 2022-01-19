import { render, screen, fireEvent } from "@testing-library/react"
import { PreferencesApp } from "../PreferencesApp"

describe("PreferencesApp", () => {
  it("renders the preference center", () => {
    render(<PreferencesApp></PreferencesApp>)

    expect(screen.getByText("Preferences Center")).toBeInTheDocument()
  })

  it("allows user to check all boxes with subscribe all", () => {
    render(<PreferencesApp></PreferencesApp>)

    let checkboxes = screen.getAllByRole("checkbox")
    const subscribeToAllCheckbox = checkboxes[0]
    const unsubscribeFromAllCheckbox = checkboxes[checkboxes.length - 1]

    fireEvent.click(subscribeToAllCheckbox)

    expect(subscribeToAllCheckbox).toBeChecked()
    expect(unsubscribeFromAllCheckbox).not.toBeChecked()

    checkboxes.shift()
    checkboxes.pop()

    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked()
    })
  })
})
