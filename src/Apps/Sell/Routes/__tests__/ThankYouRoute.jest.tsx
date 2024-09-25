import { screen } from "@testing-library/react"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { ThankYouRoute } from "Apps/Sell/Routes/ThankYouRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
const trackEvent = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => {
    return {
      trackEvent,
    }
  })
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return { isLoggedIn: true }
  })

  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: {
      location: { pathname: "/sell/submissions/submission-id/thank-you" },
    },
  }))

  mockPush.mockClear()
  trackEvent.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <ThankYouRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query ThankYouRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
        ...ThankYouRoute_submission
      }
    }
  `,
})

describe("ThankYouRoute", () => {
  describe("in SUBMITTED state", () => {
    it("renders text", () => {
      renderWithRelay({ ConsignmentSubmission: () => ({ state: "SUBMITTED" }) })

      expect(
        screen.getByText("Thank you for submitting your artwork")
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          "An Artsy Advisor will email you within 3-5 days to review your submission and discuss next steps. In the meantime your submission will appear in the feature, My Collection."
        )
      ).toBeInTheDocument()

      expect(screen.getByText("Submit Another Work")).toBeInTheDocument()
      expect(
        screen.getByText("View Artwork in My Collection")
      ).toBeInTheDocument()
    })
  })

  describe("in APPROVED state", () => {
    it("renders text", () => {
      renderWithRelay({ ConsignmentSubmission: () => ({ state: "APPROVED" }) })

      expect(
        screen.getByText("Thank you for submitting additional information")
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          "This will be used to list, sell and fulfill your work. Additional information may be requested."
        )
      ).toBeInTheDocument()

      expect(screen.getByText("Submit Another Work")).toBeInTheDocument()
      expect(
        screen.getByText("View Artwork in My Collection")
      ).toBeInTheDocument()
    })
  })

  it("clicking on Submit Another Work navigates to new submission route", () => {
    renderWithRelay({})

    const submitAnotherWorkButton = screen.getByTestId("submit-another-work")
    expect(submitAnotherWorkButton).toHaveAttribute(
      "href",
      "/sell/submissions/new"
    )

    submitAnotherWorkButton.click()

    expect(trackEvent).toHaveBeenCalledWith({
      action: "tappedSubmitAnotherWork",
      context_module: "sell",
      context_owner_type: "submitArtworkStepCompleteYourSubmissionPostApproval",
      submission_id: '<mock-value-for-field-"internalID">',
    })
  })

  describe("View Artwork in My Collection button", () => {
    it("navigates to artwork page & tracks the event", () => {
      renderWithRelay()

      expect(
        screen.getByText("View Artwork in My Collection")
      ).toBeInTheDocument()

      const viewCollectionButton = screen.getByTestId("view-collection")
      expect(viewCollectionButton).toHaveAttribute(
        "href",
        '/my-collection/artwork/<mock-value-for-field-"myCollectionArtworkID">'
      )

      viewCollectionButton.click()

      expect(trackEvent).toHaveBeenCalledWith({
        action: "tappedViewArtworkInMyCollection",
        context_module: "sell",
        context_owner_type:
          "submitArtworkStepCompleteYourSubmissionPostApproval",
        submission_id: '<mock-value-for-field-"internalID">',
      })
    })

    describe("when My Collection artwork ID is NOT present", () => {
      it("navigates to artwork grid", () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({ myCollectionArtworkID: null }),
        })

        expect(
          screen.getByText("View Artwork in My Collection")
        ).toBeInTheDocument()

        const viewCollectionButton = screen.getByTestId("view-collection")
        expect(viewCollectionButton).toHaveAttribute("href", "/my-collection")

        viewCollectionButton.click()

        expect(trackEvent).toHaveBeenCalledWith({
          action: "tappedViewArtworkInMyCollection",
          context_module: "sell",
          context_owner_type:
            "submitArtworkStepCompleteYourSubmissionPostApproval",
          submission_id: '<mock-value-for-field-"internalID">',
        })
      })
    })

    describe("when submission is in SUBMITTED state", () => {
      it("tracks with submitArtworkStepCompleteYourSubmission owner type", () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({ state: "SUBMITTED" }),
        })

        screen.getByTestId("view-collection").click()

        expect(trackEvent).toHaveBeenCalledWith({
          action: "tappedViewArtworkInMyCollection",
          context_module: "sell",
          context_owner_type: "submitArtworkStepCompleteYourSubmission",
          submission_id: '<mock-value-for-field-"internalID">',
        })
      })
    })
  })
})
