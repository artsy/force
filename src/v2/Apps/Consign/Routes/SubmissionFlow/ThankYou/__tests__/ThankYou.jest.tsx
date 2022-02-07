import { mount } from "enzyme"
import { ThankYou } from "../ThankYou"
import { AnalyticsSchema, useTracking, useSystemContext } from "v2/System"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { useRouter } from "v2/System/Router/useRouter"

jest.mock("v2/System/Analytics/useTracking")

jest.mock("v2/System/Router/useRouter")

jest.mock("v2/System/useSystemContext")

jest.mock("../../../MarketingLanding/Components/SoldRecently", () => ({
  SoldRecentlyQueryRenderer: () => <div />,
}))
jest.mock("../../../MarketingLanding/Components/FAQ", () => ({
  FAQ: () => <div />,
}))

const trackEvent = useTracking as jest.Mock

describe("ThankYou page", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useRouter as jest.Mock).mockImplementation(() => {
      return {
        match: {
          params: {
            id: "12345",
          },
        },
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        isLoggedIn: true,
        user: {
          id: "123",
          email: "d@e.f",
        },
      }
    })
  })

  it("renders correctly", () => {
    const wrapper = mount(<ThankYou />)
    const text = wrapper.text()

    expect(text).toContain("Thank you for submitting a work")
    expect(text).toContain(
      "We’ll email you within 1–3 business days to let you know the status of your submission"
    )
    expect(text).toContain(
      "In the meantime, feel free to submit another work—and benefit from Artsy’s low fees, informed pricing, and multiple selling options"
    )

    expect(
      wrapper.find("button[data-test-id='submit-another-work']").text()
    ).toContain("Submit Another Work")

    expect(
      wrapper.find("button[data-test-id='go-to-artsy-homepage']").text()
    ).toContain("Back to Artsy Homepage")

    expect(wrapper.find("SoldRecentlyQueryRenderer").length).toBe(1)
    expect(wrapper.find("FAQ").length).toBe(1)
  })

  describe("when user logged in", () => {
    it("tracks submit another artwork click with user email and ID", async () => {
      const wrapper = mount(<ThankYou />)

      const submitAnotherButton = wrapper.find(
        "button[data-test-id='submit-another-work']"
      )

      submitAnotherButton.simulate("click")

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.SubmitAnotherArtwork,
        context_module: ContextModule.consignSubmissionFlow,
        context_owner_type: OwnerType.consignmentSubmission,
        submission_id: "12345",
        user_email: "d@e.f",
        user_id: "123",
      })
    })
  })
  describe("when user is notlogged in", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          isLoggedIn: false,
          user: {
            id: "",
            email: "",
          },
        }
      })
    })

    it("tracks submit another artwork click without user email", async () => {
      const wrapper = mount(<ThankYou />)

      const submitAnotherButton = wrapper.find(
        "button[data-test-id='submit-another-work']"
      )

      submitAnotherButton.simulate("click")

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.SubmitAnotherArtwork,
        context_module: ContextModule.consignSubmissionFlow,
        context_owner_type: OwnerType.consignmentSubmission,
        submission_id: "12345",
        user_email: "",
        user_id: "",
      })
    })
  })
})
