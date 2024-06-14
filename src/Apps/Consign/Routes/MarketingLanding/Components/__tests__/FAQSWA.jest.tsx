import { render, screen } from "@testing-library/react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FAQSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FAQSWA"

jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")

describe("FAQSWA", () => {
  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
    }))
  })

  it("renders correctly", () => {
    render(<FAQSWA />)

    expect(
      screen.getByText(
        "No upfront fees, clear pricing estimates, and competitive commission structures."
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
        "https://support.artsy.net/s/topic/0TO3b000000UesxGAC/sell"
      )
    })
  })
})
