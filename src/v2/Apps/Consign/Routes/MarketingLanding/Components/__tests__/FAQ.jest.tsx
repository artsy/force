import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { FAQ } from "../FAQ"
import { Breakpoint } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "v2/System"
import { ContextModule, OwnerType } from "@artsy/cohesion"

jest.mock("v2/System/Analytics/useTracking")

const trackEvent = useTracking as jest.Mock

describe("FAQ", () => {
  const getWrapper = (breakpoint = "md") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <FAQ />
      </MockBoot>
    )
  }

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("toggles FAQ questions", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).not.toContain(
      "We offer no upfront fees." // hidden
    )
    wrapper.find("Clickable").first().simulate("click")
    wrapper.update()
    expect(wrapper.html()).toContain(
      "We offer no upfront fees." // visible on toggle click
    )
  })

  it("tracks a FAQ click with correct params", () => {
    const wrapper = getWrapper()
    wrapper.find("Clickable").first().simulate("focus")

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action_type: AnalyticsSchema.ActionType.ClickedFAQ,
      context_module: ContextModule.consignSubmissionFlow,
      context_owner_type: OwnerType.consignmentSubmission,
      subject: "What does it cost to sell with Artsy?",
    })
  })
})
