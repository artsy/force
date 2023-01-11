import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { mount } from "enzyme"
import { ThankYou } from "Apps/Consign/Routes/SubmissionFlow/ThankYou/ThankYou"
import { useSystemContext } from "System"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { useRouter } from "System/Router/useRouter"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

jest.mock("System/Router/useRouter")

jest.mock("System/useSystemContext")

jest.mock("../../../MarketingLanding/Components/SoldRecentlyOnArtsy", () => ({
  SoldRecentlyOnArtsyQueryRenderer: () => <div />,
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
  })

  describe("when user is logged in", () => {
    beforeEach(() => {
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

      expect(text).toContain("Your artwork has been submitted")
      expect(text).toContain(
        "We will email you within 1-3 days to confirm if your artwork has been accepted or not. In the meantime your submission will appear in the feature, My Collection."
      )
      expect(text).toContain(
        "With low fees, informed pricing, and multiple sales options, why not submit another piece with Artsy."
      )

      expect(
        wrapper.find("button[data-test-id='submit-another-work']").text()
      ).toContain("Submit Another Work")

      expect(
        wrapper
          .find(
            "button[data-test-id='swa-thank-you-view-in-my-collection-button']"
          )
          .text()
      ).toContain("View Artwork in My Collection")

      expect(text).toContain("View My Collection on the Artsy App")

      expect(wrapper.find("SoldRecentlyOnArtsyQueryRenderer").length).toBe(1)
      expect(wrapper.find("FAQ").length).toBe(1)
    })
  })

  describe("when user is not logged in", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          isLoggedIn: false,
        }
      })
    })
    it("renders correctly", () => {
      const wrapper = mount(<ThankYou />)
      const text = wrapper.text()

      expect(text).toContain("Thank you for submitting a work")
      expect(text).toContain(
        "We’ll email you within 1–3 business days to let you know the status of your submission."
      )
      expect(text).toContain(
        "In the meantime, feel free to submit another work—and benefit from Artsy’s low fees, informed pricing, and multiple selling options."
      )

      expect(
        wrapper.find("button[data-test-id='submit-another-work']").text()
      ).toContain("Submit Another Work")

      expect(
        wrapper
          .find(
            "button[data-test-id='swa-thank-you-view-in-my-collection-button']"
          )
          .text()
      ).toContain("View Artwork in My Collection")

      expect(text).toContain("View My Collection on the Artsy App")

      expect(wrapper.find("SoldRecentlyOnArtsyQueryRenderer").length).toBe(1)
      expect(wrapper.find("FAQ").length).toBe(1)
    })

    it("tracks submit another artwork click without user email", async () => {
      const wrapper = mount(<ThankYou />)

      const submitAnotherButton = wrapper.find(
        "button[data-test-id='submit-another-work']"
      )

      submitAnotherButton.simulate("click")

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.SubmitAnotherArtwork,
        context_module: ContextModule.consignSubmissionFlow,
        context_owner_type: OwnerType.consignmentSubmission,
        submission_id: "12345",
        user_email: undefined,
        user_id: undefined,
      })
    })
  })
})
