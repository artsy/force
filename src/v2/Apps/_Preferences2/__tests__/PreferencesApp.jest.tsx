import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { flushPromiseQueue } from "v2/DevTools"
import { PreferencesApp } from "../PreferencesApp"

describe("PreferencesApp", () => {
  it("renders the preference center", () => {
    render(<PreferencesApp></PreferencesApp>)

    expect(screen.getByText("Preferences Center")).toBeInTheDocument()
  })

  it.skip("allows user to uncheck all boxes with unsubscribe all", async () => {
    render(<PreferencesApp></PreferencesApp>)

    let checkboxes = screen.getAllByRole("checkbox")
    const unsubscribeFromAllCheckbox = checkboxes[checkboxes.length - 1]

    userEvent.click(unsubscribeFromAllCheckbox)

    await flushPromiseQueue()

    await waitFor(() => expect(unsubscribeFromAllCheckbox).toBeChecked())

    checkboxes.pop()

    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked()
    })
  })
})
