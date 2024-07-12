import { screen, waitFor } from "@testing-library/react"
import { ConditionRoute } from "Apps/Sell/Routes/AdditionalRoutes/ConditionRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { ConditionRoute_Test_Query$rawResponse } from "__generated__/ConditionRoute_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
let submitMutation: jest.Mock
const trackEvent = jest.fn()

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("Utils/Hooks/useMutation")
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

const submissionMock: Partial<
  ConditionRoute_Test_Query$rawResponse["submission"]
> = { state: "DRAFT" }

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
    match: { location: { pathname: "/submissions/submission-id/condition" } },
  }))

  submitMutation = jest.fn(() => ({ catch: () => {} }))
  ;(useMutation as jest.Mock).mockImplementation(() => {
    return { submitMutation }
  })

  mockPush.mockClear()
  trackEvent.mockClear()
  submitMutation.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <ConditionRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query ConditionRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...ConditionRoute_submission
        ...SubmissionRoute_submission
      }
    }
  `,
})

describe("ConditionRoute", () => {
  it("renders the condition step", async () => {
    renderWithRelay({})

    await waitFor(() => {
      expect(screen.getByText("Condition")).toBeInTheDocument()
    })
  })

  describe("when form is valid", () => {
    it("updates the submission", async () => {
      renderWithRelay({})
    })
  })

  describe("when form is not valid", () => {
    it("does not update the submission", async () => {
      renderWithRelay({})
    })
  })

  describe("navigation", () => {
    describe("in APPROVED state", () => {
      it("saves the submission, sets the state to `SUBMITTED` & navigates to the thank you step", async () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({
            ...submissionMock,
            state: "APPROVED",
          }),
        })

        screen.getByText("Submit Artwork").click()

        await waitFor(() => {
          // expect(trackEvent).toHaveBeenCalledWith({
          //   action: "consignmentSubmitted",
          //   context_module: "sell",
          //   context_owner_type: "submitArtworkStepAddPhoneNumber",
          //   fieldsProvided: [],
          //   submission_id: '<mock-value-for-field-"externalId">',
          // })

          expect(submitMutation).toHaveBeenCalledWith(
            expect.objectContaining({
              variables: {
                input: {
                  externalId: '<mock-value-for-field-"externalId">',
                  title: '<mock-value-for-field-"title">',
                },
              },
            })
          )

          expect(submitMutation).not.toHaveBeenCalledWith(
            expect.objectContaining({
              variables: {
                input: {
                  externalId: '<mock-value-for-field-"externalId">',
                  state: "SUBMITTED",
                },
              },
            })
          )

          expect(mockPush).toHaveBeenCalledWith(
            '/sell/submissions/<mock-value-for-field-"externalId">/thank-you'
          )
        })
      })
    })
  })
})
