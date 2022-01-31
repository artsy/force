import { mount } from "enzyme"
import { ThankYou } from "../ThankYou"
import { AnalyticsSchema, useTracking, useSystemContext } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"
import { ContextModule, OwnerType } from "@artsy/cohesion"

jest.mock("../../../MarketingLanding/Components/SoldRecently", () => ({
  SoldRecentlyQueryRenderer: () => <div />,
}))
jest.mock("../../../MarketingLanding/Components/FAQ", () => ({
  FAQ: () => <div />,
}))

jest.mock("v2/System/Analytics/useTracking")

jest.mock("v2/System/Router/useRouter")

jest.mock("v2/System/useSystemContext")

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
        isLoggedIn: false,
        user: {
          id: "",
          email: "",
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

  describe("when there is no logged in user", () => {
    it("tracks submit another artwork event with correct params", async () => {
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

    describe("when there is a logged in user", () => {
      beforeEach(() => {
        ;(useSystemContext as jest.Mock).mockImplementation(() => {
          return {
            isLoggedIn: true,
            user: {
              id: "0000",
              email: "a@b.c",
            },
          }
        })
      })
      it("tracks yes submit another artwork event with user details", async () => {
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
          user_email: "a@b.c",
          user_id: "0000",
        })
      })
    })
  })
})
