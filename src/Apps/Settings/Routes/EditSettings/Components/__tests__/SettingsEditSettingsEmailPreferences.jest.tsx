import { render, screen } from "@testing-library/react"
import { SettingsEditSettingsEmailPreferences } from "../SettingsEditSettingsEmailPreferences/SettingsEditSettingsEmailPreferences"

describe("SettingsEditSettingsEmailPreferences", () => {
  it("renders the form", () => {
    render(<SettingsEditSettingsEmailPreferences />)

    expect(screen.queryByText("Update Email Preferences")).toBeInTheDocument()
  })
})
