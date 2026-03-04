import { Theme } from "@artsy/palette"
import { FeatureFlagOverrideIndicator } from "Components/FeatureFlagOverrideIndicator"
import { fireEvent, render, screen } from "@testing-library/react"

const STORAGE_KEY = "unleash_overrides"

describe("FeatureFlagOverrideIndicator", () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  const renderComponent = () => {
    return render(
      <Theme>
        <FeatureFlagOverrideIndicator />
      </Theme>,
    )
  }

  it("renders nothing when no overrides are present", () => {
    const { container } = renderComponent()
    expect(container.innerHTML).toBe("")
  })

  it("renders badge when overrides are present", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ "my-flag": "true" }),
    )
    renderComponent()
    expect(screen.getByText("1 override active")).toBeInTheDocument()
  })

  it("shows plural text for multiple overrides", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ "flag-a": "true", "flag-b": "experiment" }),
    )
    renderComponent()
    expect(screen.getByText("2 overrides active")).toBeInTheDocument()
  })

  it("expands to show flag details when badge is clicked", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ "my-flag": "experiment" }),
    )
    renderComponent()

    fireEvent.click(screen.getByText("1 override active"))

    expect(screen.getByText("Unleash Overrides")).toBeInTheDocument()
    expect(screen.getByText("my-flag")).toBeInTheDocument()
    expect(screen.getByText("experiment")).toBeInTheDocument()
    expect(screen.getByText("Clear all")).toBeInTheDocument()
  })

  it("clears overrides and hides indicator when 'Clear all' is clicked", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ "my-flag": "true" }),
    )
    renderComponent()

    // Expand
    fireEvent.click(screen.getByText("1 override active"))
    // Clear
    fireEvent.click(screen.getByText("Clear all"))

    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(screen.queryByText(/override/)).not.toBeInTheDocument()
  })

  it("collapses panel when badge is clicked again", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ "my-flag": "true" }),
    )
    renderComponent()

    // Expand
    fireEvent.click(screen.getByText("1 override active"))
    expect(screen.getByText("Unleash Overrides")).toBeInTheDocument()

    // Collapse
    fireEvent.click(screen.getByText("1 override active"))
    expect(screen.queryByText("Unleash Overrides")).not.toBeInTheDocument()
  })
})
