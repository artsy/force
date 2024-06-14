import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { HowItWorksSteps } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HowItWorksSteps"

jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))
const mockShowAuthDialog = jest.fn()
jest.mock("Components/AuthDialog", () => ({
  useAuthDialog: jest.fn(() => ({
    showAuthDialog: mockShowAuthDialog,
  })),
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { params: { id: "1" } },
  })),
}))

const trackEvent = useTracking as jest.Mock

describe("HowItWorksSteps", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
      isLoggedIn: true,
    }))
  })

  it("renders correctly", () => {
    render(<HowItWorksSteps />)

    expect(screen.getByText("How it works")).toBeInTheDocument()
    expect(screen.getByText("Submit your artwork")).toBeInTheDocument()
    expect(screen.getByText("Get Started")).toBeInTheDocument()
  })

  describe("Start Selling button", () => {
    describe("when user is not logged in", () => {
      beforeAll(() => {
        ;(useSystemContext as jest.Mock).mockImplementation(() => ({
          user: { id: "user-id", email: "user-email@artsy.net" },
          isLoggedIn: false,
        }))
      })

      it("links out to the auth flow when pressed", async () => {
        render(<HowItWorksSteps />)
        const link = screen.getByTestId("start-selling-button")

        expect(link).toBeInTheDocument()
        expect(link).toHaveTextContent("Get Started")
        fireEvent.click(link)

        expect(mockShowAuthDialog).toHaveBeenCalled()
      })
    })

    describe("when user is logged in", () => {
      beforeAll(() => {
        ;(useSystemContext as jest.Mock).mockImplementation(() => ({
          user: { id: "user-id", email: "user-email@artsy.net" },
          isLoggedIn: true,
        }))
      })

      it("links out to submission flow", () => {
        render(<HowItWorksSteps />)
        const link = screen.getByTestId("start-selling-button")

        expect(link).toBeInTheDocument()
        expect(link).toHaveTextContent("Get Started")
        expect(link).toHaveAttribute("href", "/sell/submission")
      })

      it("tracks click", () => {
        render(<HowItWorksSteps />)

        fireEvent.click(screen.getByTestId("start-selling-button"))

        expect(trackEvent).toHaveBeenCalled()
        expect(trackEvent).toHaveBeenCalledWith({
          action: "tappedConsign",
          context_module: "sellHowItWorks",
          context_page_owner_type: "sell",
          label: "Get Started",
          destination_path: "/sell/submission",
          user_id: "user-id",
        })
      })
    })
  })
})
