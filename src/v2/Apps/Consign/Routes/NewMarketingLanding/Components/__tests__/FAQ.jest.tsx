import { FAQ } from "../FAQ"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking, AnalyticsSchema } from "v2/System/Analytics"

jest.mock("v2/System/Analytics/useTracking")

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { params: { id: "1" } },
  })),
}))

const trackEvent = useTracking as jest.Mock

describe("FAQ", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("toggles FAQ questions", () => {
    render(<FAQ />)

    const question = screen.getByText("What does it cost to sell with Artsy?")
    expect(question).toBeInTheDocument()
    expect(
      screen.queryByText(/^There are no upfront fees./)
    ).not.toBeInTheDocument()

    fireEvent.click(question)

    expect(
      screen.queryByText(/^There are no upfront fees./)
    ).toBeInTheDocument()
  })

  it("tracks a FAQ click with correct params when submission id found", () => {
    render(<FAQ />)

    fireEvent.focus(screen.getByText("What does it cost to sell with Artsy?"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action_type: AnalyticsSchema.ActionType.ClickedFAQ,
      context_module: ContextModule.consignSubmissionFlow,
      context_owner_type: OwnerType.consignmentSubmission,
      subject: "What does it cost to sell with Artsy?",
    })
  })
})
