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
      location: { pathname: "submissions/submission-id/thank-you" },
    },
  }))
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
  it("renders text", () => {
    renderWithRelay({})

    expect(screen.getByText("Submit Another Work")).toBeInTheDocument()

    expect(
      screen.getByText("Thank you for submitting your artwork")
    ).toBeInTheDocument()
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
      context_owner_type: "submitArtworkStepCompleteYourSubmission",
      submission_id: '<mock-value-for-field-"internalID">',
    })
  })

  it("clicking on View Artwork in My Collection navigates to My Collection route", () => {
    renderWithRelay({})

    expect(
      screen.getByText("View Artwork in My Collection")
    ).toBeInTheDocument()

    const viewCollectionButton = screen.getByTestId("view-collection")
    expect(viewCollectionButton).toHaveAttribute("href", "/my-collection")

    viewCollectionButton.click()

    expect(trackEvent).toHaveBeenCalledWith({
      action: "tappedViewArtworkInMyCollection",
      context_module: "sell",
      context_owner_type: "submitArtworkStepCompleteYourSubmission",
      submission_id: '<mock-value-for-field-"internalID">',
    })
  })
})
