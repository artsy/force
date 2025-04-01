import { render, screen } from "@testing-library/react"
import { SettingsEditSettingsEmailPreferences } from "../SettingsEditSettingsEmailPreferences/SettingsEditSettingsEmailPreferences"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn().mockReturnValue(false),
}))

describe("SettingsEditSettingsEmailPreferences", () => {
  it("renders the form", () => {
    render(<SettingsEditSettingsEmailPreferences />)

    expect(screen.queryByText("Update Email Preferences")).toBeInTheDocument()
  })
})
