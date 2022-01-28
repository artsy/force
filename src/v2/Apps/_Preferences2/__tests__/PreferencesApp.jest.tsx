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
    let unsubscribeFromAllCheckbox = checkboxes[checkboxes.length - 1]

    // Unsubscribe from all defaults to checked, so we click it twice!
    fireEvent.click(unsubscribeFromAllCheckbox)
    fireEvent.click(unsubscribeFromAllCheckbox)

    expect(screen.getAllByRole("checkbox")[checkboxes.length - 1]).toBeChecked()

    checkboxes.pop()

    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked()
    })
  })
})
