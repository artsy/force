import { render, screen, fireEvent } from "@testing-library/react"
import { PreferencesApp } from "../PreferencesApp"

describe("PreferencesApp", () => {
  it("renders the preference center", () => {
    render(<PreferencesApp></PreferencesApp>)

    expect(screen.getByText("Preferences Center")).toBeInTheDocument()
  })

  it("allows user to uncheck all boxes with unsubscribe all", () => {
    render(<PreferencesApp></PreferencesApp>)

    let checkboxes = screen.getAllByRole("checkbox")
    const unsubscribeFromAllCheckbox = checkboxes[checkboxes.length - 1]

    fireEvent.click(unsubscribeFromAllCheckbox)

    expect(unsubscribeFromAllCheckbox).toBeChecked()

    checkboxes.pop()

    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked()
    })
  })
})
