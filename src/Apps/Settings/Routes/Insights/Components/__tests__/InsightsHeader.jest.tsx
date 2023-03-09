import { render, screen } from "@testing-library/react"
import { MockBoot } from "DevTools/MockBoot"
import { InsightsHeader } from "Apps/Settings/Routes/Insights/Components/InsightsHeader"

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
    renderComponent()

    expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
    expect(
      screen
        .getAllByRole("link")
        .find(c => c.textContent?.includes("Upload Artwork"))
    ).toHaveAttribute("href", "/collector-profile/my-collection/artworks/new")
  })
})
