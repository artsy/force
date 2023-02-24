import { render, screen } from "@testing-library/react"
import { MockBoot } from "DevTools"
import { useSystemContext } from "System/useSystemContext"
import { InsightsHeader } from "Apps/Settings/Routes/Insights/Components/InsightsHeader"

jest.mock("System/useSystemContext")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("Components/Sticky", () => ({
  Sticky: ({ children }) => children({ stuck: true }),
  StickyProvider: ({ children }) => children,
}))

describe("InsightsHeader", () => {
  const renderComponent = () =>
    render(
      <MockBoot>
        <InsightsHeader />
      </MockBoot>
    )

  it("renders the Upload artwork CTA and the textual content", () => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "cx-collector-profile": { flagEnabled: false },
      },
    }))
    renderComponent()

    expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
    expect(
      screen
        .getAllByRole("link")
        .find(c => c.textContent?.includes("Upload Artwork"))
    ).toHaveAttribute("href", "/my-collection/artworks/new")
  })

  it("renders the Upload artwork CTA and the textual content with cx-collector-profile enabled", () => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "cx-collector-profile": { flagEnabled: true },
      },
    }))
    renderComponent()

    expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
    expect(
      screen
        .getAllByRole("link")
        .find(c => c.textContent?.includes("Upload Artwork"))
    ).toHaveAttribute("href", "/collector-profile/my-collection/artworks/new")
  })
})
