import { render } from "enzyme"
import { PreferencesApp } from "../PreferencesApp"

describe("PreferencesApp", () => {
  it("renders the preference center", () => {
    const wrapper = render(<PreferencesApp></PreferencesApp>)

    expect(wrapper.text()).toContain("Preferences Center")
  })
})
