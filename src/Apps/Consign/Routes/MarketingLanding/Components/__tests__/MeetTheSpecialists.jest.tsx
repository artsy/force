import { fireEvent, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { MeetTheSpecialistsFragmentContainer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/MeetTheSpecialists"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))

const mockRouterPush = jest.fn()
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    push: mockRouterPush,
    match: { params: { id: "1" } },
  })),
}))

const trackEvent = useTracking as jest.Mock

const { renderWithRelay } = setupTestWrapperTL({
  Component: MeetTheSpecialistsFragmentContainer,
  query: graphql`
    query MeetTheSpecialists_test_Query @relay_test_operation {
      staticContent {
        ...MeetTheSpecialists_staticContent
      }
    }
  `,
})

describe("MeetTheSpecialists", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
    }))
  })

  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByText("Meet the specialists")).toBeInTheDocument()
    expect(screen.getByText("Get in Touch")).toBeInTheDocument()
  })

  it("Get in Touch button links out to submission flow and tracks click", () => {
    renderWithRelay()

    const link = screen.getByTestId("get-in-touch-button")

    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent("Get in Touch")
    expect(link).toHaveAttribute("href", "/sell/inquiry")

    fireEvent.click(link)

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: "tappedConsignmentInquiry",
      context_module: "sellMeetTheSpecialists",
      context_page_owner_type: "sell",
      label: "Get in Touch",
      user_id: "user-id",
      user_email: "user-email@artsy.net",
    })
  })

  it("Contact the specialist button links out to email provider", () => {
    renderWithRelay({ StaticContent: () => mockstaticContent })

    expect(screen.getByText("Jessica Backus")).toBeInTheDocument()

    const link = screen.getByTestId("get-in-touch-button-Jessica")

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/sell/inquiry/jessica@artsymail.com")
  })
})

const mockstaticContent = {
  specialistBios: [
    {
      name: "Jessica Backus",
      firstName: "Jessica",
      jobTitle: "some job title",
      bio: "some bio",
      email: "jessica@artsymail.com",
      image: {},
    },
    {
      name: "Rachel Hagopian",
      firstName: "Rachel",
      jobTitle: "some job title",
      bio: "some bio",
      email: "rachel.hagopian@artsy.net",
      image: {},
    },
  ],
}
