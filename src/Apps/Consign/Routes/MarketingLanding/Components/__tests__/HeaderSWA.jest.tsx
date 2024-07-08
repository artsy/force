import { fireEvent, render, screen } from "@testing-library/react"
import { HeaderSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HeaderSWA"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useTracking } from "react-tracking"

const mockUseFeatureFlag = useFeatureFlag as jest.Mock
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { params: { id: "1" } },
  })),
}))

const trackEvent = useTracking as jest.Mock

const getMock = jest.fn()
Storage.prototype.getItem = getMock

describe("HeaderSWA", () => {
  beforeAll(() => {
    mockUseFeatureFlag.mockImplementation(() => true)
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders correctly", () => {
    render(<HeaderSWA />)

    expect(
      screen.getByText("Sell art from your collection")
    ).toBeInTheDocument()
    expect(screen.getByText("Start Selling")).toBeInTheDocument()
    expect(screen.getByText("Get in Touch")).toBeInTheDocument()
  })

  describe("Start Selling button", () => {
    it("links out to submission flow", () => {
      render(<HeaderSWA />)

      const link = screen.getByTestId("start-selling-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Start Selling")
      expect(link).toHaveAttribute("href", "sell/intro")
    })

    it("tracks click", () => {
      render(<HeaderSWA />)

      fireEvent.click(screen.getByTestId("start-selling-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "tappedConsign",
        context_module: "Header",
        context_page_owner_type: "sell",
        label: "Start Selling",
        destination_path: "/sell/submission",
      })
    })
  })

  describe("Get in Touch button", () => {
    it("tracks click", () => {
      render(<HeaderSWA />)

      fireEvent.click(screen.getByTestId("get-in-touch-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "tappedConsignmentInquiry",
        context_module: "Header",
        context_page_owner_type: "sell",
        label: "Get in Touch",
      })
    })

    it("links out to email provider", () => {
      render(<HeaderSWA />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
      expect(link).toHaveAttribute("href", "/sell/inquiry")
    })

    describe("with previous draft submission", () => {
      beforeEach(() => {
        getMock.mockImplementation(key =>
          key === "previousSubmissionID" ? "test-id" : "test-step"
        )
      })

      it("renders previous submission", () => {
        render(<HeaderSWA />)

        expect(getMock).toHaveBeenCalledWith("previousSubmissionID")

        expect(
          screen.queryByText("Finish previous submission:")
        ).not.toBeInTheDocument()
      })
    })
  })
})
