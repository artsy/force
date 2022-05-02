import { FAQ } from "../FAQ"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking, AnalyticsSchema } from "v2/System/Analytics"
import { useRouter } from "v2/System/Router/useRouter"

jest.mock("v2/System/Analytics/useTracking")

jest.mock("v2/System/Router/useRouter")

const trackEvent = jest.fn()

describe("FAQ", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useRouter as jest.Mock).mockImplementation(() => {
      return {
        match: { params: { id: null } },
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

  it("doesn't track a FAQ click if submission id not found", () => {
    render(<FAQ />)

    fireEvent.focus(screen.getByText("What does it cost to sell with Artsy?"))

    expect(trackEvent).not.toHaveBeenCalled()
  })

  it("tracks a FAQ click with correct params when submission id found", () => {
    ;(useRouter as jest.Mock).mockImplementation(() => {
      return {
        match: { params: { id: "1" } }, //submissionId
      }
    })

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
