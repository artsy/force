import { render, screen } from "@testing-library/react"
import { useSystemContext } from "System/useSystemContext"
import { FAQSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FAQSWA"

jest.mock("react-tracking")
// TODO: Remove feature flag mock when feature flag is removed
jest.mock("System/useSystemContext")

describe("FAQSWA", () => {
  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
      featureFlags: {
        "cx-swa-landing-page-redesign-2023": { flagEnabled: true },
      },
    }))
  })

  it("renders correctly", () => {
    render(<FAQSWA />)

    expect(
      screen.getByText(
        "No upfront fees, clear pricing estimates and commission structures."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Have more questions?")).toBeInTheDocument()
  })

  describe("Read FAQs button", () => {
    it("links out to submission flow", () => {
      render(<FAQSWA />)

      const link = screen.getByTestId("read-FAQs-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Read FAQs")
      expect(link).toHaveAttribute(
        "href",
        "https://support.artsy.net/hc/en-us/categories/360003689533-Sell"
      )
    })
  })
})
