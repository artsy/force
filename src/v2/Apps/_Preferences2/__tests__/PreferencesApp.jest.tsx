import { render, screen, fireEvent } from "@testing-library/react"
import { PreferencesApp } from "../PreferencesApp"

describe("PreferencesApp", () => {
  it("renders the preference center", () => {
    render(<PreferencesApp></PreferencesApp>)

    expect(screen.getByText("Preferences Center")).toBeInTheDocument()
  })

  it("has disabled buttons until a change is made", () => {
    render(<PreferencesApp></PreferencesApp>)

    // eslint-disable-next-line testing-library/no-node-access
    let saveButton = screen.getByText("Save").closest("button")
    let checkboxes = screen.getAllByRole("checkbox")

    expect(saveButton).toBeDisabled()

    fireEvent.click(checkboxes[0])

    expect(saveButton).toBeEnabled()
  })

  it("allows user to uncheck all boxes with unsubscribe from all", () => {
    render(<PreferencesApp></PreferencesApp>)

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
    render(<PreferencesApp></PreferencesApp>)

    expect(screen.getByText("Unsubscribe from all")).toBeInTheDocument()

    let checkboxes = screen.getAllByRole("checkbox")
    let subscribeToAllCheckbox = checkboxes[0]
    let unsubscribeFromAllCheckbox = checkboxes.pop()

    fireEvent.click(checkboxes[3])

    expect(subscribeToAllCheckbox).not.toBeChecked()
    expect(unsubscribeFromAllCheckbox).not.toBeChecked()
  })

  it("allows user to check all boxes with subscribe to all", () => {
    render(<PreferencesApp></PreferencesApp>)

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
