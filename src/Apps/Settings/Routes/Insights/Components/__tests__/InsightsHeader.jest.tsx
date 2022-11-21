import { render, screen } from "@testing-library/react"
import { MockBoot } from "DevTools"
import { useSystemContext } from "System"
import { InsightsHeader } from "Apps/Settings/Routes/Insights/Components/InsightsHeader"

jest.mock("System/useSystemContext")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("InsightsHeader", () => {
  const renderComponent = () =>
    render(
      <MockBoot>
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

  it("renders the Upload artwork CTA and the textual content", () => {
    renderComponent()

    expect(
      screen.getByText("Gain deeper knowledge of your collection.")
    ).toBeInTheDocument()
    expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
  })
})
