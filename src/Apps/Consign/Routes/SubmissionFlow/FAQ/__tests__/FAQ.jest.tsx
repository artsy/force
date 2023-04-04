import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { FAQ } from "Apps/Consign/Routes/SubmissionFlow/FAQ/FAQ"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

const trackEvent = jest.fn()

describe("FAQ", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
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

  it("doesn't track a FAQ click if there is no needs", () => {
    render(<FAQ />)

    fireEvent.focus(screen.getByText("What does it cost to sell with Artsy?"))

    expect(trackEvent).not.toHaveBeenCalled()
  })

  it("tracks a FAQ click with correct params", () => {
    render(<FAQ shouldTrackClickEvent />)

    fireEvent.focus(screen.getByText("What does it cost to sell with Artsy?"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action_type: DeprecatedAnalyticsSchema.ActionType.ClickedFAQ,
      context_module: ContextModule.consignSubmissionFlow,
      context_owner_type: OwnerType.consignmentSubmission,
      subject: "What does it cost to sell with Artsy?",
    })
  })
})
