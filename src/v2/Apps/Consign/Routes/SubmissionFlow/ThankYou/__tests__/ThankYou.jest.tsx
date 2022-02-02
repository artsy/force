import { ThankYouFragmentContainer } from "../ThankYou"
import { AnalyticsSchema, useTracking, useSystemContext } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { screen, fireEvent } from "@testing-library/react"

jest.unmock("react-relay")

jest.mock("v2/System/Analytics/useTracking")

jest.mock("v2/System/Router/useRouter")

jest.mock("v2/System/useSystemContext")

const trackEvent = useTracking as jest.Mock

const mockSubmission = {
  userEmail: "a@b.c",
}

const getWrapper = () =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return <ThankYouFragmentContainer {...props} />
    },
    query: graphql`
      query ThankYou_SubmissionFlowTest_Query($id: ID!) @relay_test_operation {
        submission(id: $id) {
          ...ThankYou_submission
        }
      }
    `,
    variables: {
      id: "1",
    },
  })

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
    getWrapper().renderWithRelay({
      ConsignmentSubmission: () => mockSubmission,
    })

    expect(
      screen.getByText("Thank you for submitting a work")
    ).toBeInTheDocument()
    expect(screen.getByText("Submit Another Work")).toBeInTheDocument()
    expect(screen.getByText("Back to Artsy Homepage")).toBeInTheDocument()
  })

  it("tracks submit another artwork click with email from submission", async () => {
    getWrapper().renderWithRelay({
      ConsignmentSubmission: () => mockSubmission,
    })

    const submitAnotherButton = screen.getByText("Submit Another Work")
    fireEvent.click(submitAnotherButton)

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action_type: AnalyticsSchema.ActionType.SubmitAnotherArtwork,
      context_module: ContextModule.consignSubmissionFlow,
      context_owner_type: OwnerType.consignmentSubmission,
      submission_id: "12345",
      user_email: "a@b.c",
      user_id: "123",
    })
  })
})
