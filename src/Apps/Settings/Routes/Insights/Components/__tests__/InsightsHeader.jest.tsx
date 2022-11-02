import { render, screen } from "@testing-library/react"
import { MockBoot } from "DevTools"
import { useSystemContext } from "System"
import { Breakpoint } from "Utils/Responsive"
import { InsightsHeader } from "Apps/Settings/Routes/Insights/Components/InsightsHeader"

jest.mock("System/useSystemContext")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("InsightsHeader", () => {
  const renderComponent = (breakpoint: Breakpoint) =>
    render(
      <MockBoot breakpoint={breakpoint}>
        <InsightsHeader />
      </MockBoot>
    )

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "my-collection-web-phase-7-insights": { flagEnabled: true },
      },
    }))
  })

  describe("In mobile view", () => {
    it("renders only the Upload artwork CTA", () => {
      renderComponent("xs")

      expect(
        screen.queryByText("Gain deeper knowledge of your collection.")
      ).not.toBeInTheDocument()
      expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
    })
  })

  describe("In desktop view", () => {
    it("renders the Upload artwork CTA and the textual content", () => {
      renderComponent("lg")

      expect(
        screen.getByText("Gain deeper knowledge of your collection.")
      ).toBeInTheDocument()
      expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
    })
  })
})
