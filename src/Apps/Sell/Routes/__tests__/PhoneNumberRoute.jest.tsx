import { screen, waitFor } from "@testing-library/react"
import { PhoneNumberRoute } from "Apps/Sell/Routes/PhoneNumberRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { PhoneNumberRoute_Test_Query$rawResponse } from "__generated__/PhoneNumberRoute_Test_Query.graphql"
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

const submissionMock: Partial<
  PhoneNumberRoute_Test_Query$rawResponse["submission"]
> = {
  userPhoneNumber: {
    display: "017659574333",
    regionCode: "DE",
  },
}

beforeAll(() => {
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
      location: { pathname: "/submissions/submission-id/phone-number" },
    },
  }))

  submitMutation = jest.fn(() => ({ catch: () => {} }))
  ;(useMutation as jest.Mock).mockImplementation(() => {
    return { submitMutation }
  })
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <PhoneNumberRoute submission={props.submission} me={props.me} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query PhoneNumberRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...PhoneNumberRoute_submission
        ...SubmissionRoute_submission
      }
      me {
        ...PhoneNumberRoute_me
      }
    }
  `,
})

describe("PhoneNumberRoute", () => {
  it("renders the artist title step", () => {
    renderWithRelay({})

    expect(screen.getByText("Add phone number")).toBeInTheDocument()
  })

  describe("when clicking the Submit button", () => {
    it("saves the submission, sets the state to `SUBMITTED` & navigates to the thank you step", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      screen.getByText("Submit Artwork").click()

      await waitFor(() => {
        expect(trackEvent).toHaveBeenCalledWith({
          action: "consignmentSubmitted",
          context_module: "sell",
          context_owner_type: "submitArtworkStepAddPhoneNumber",
          fieldsProvided: [],
          submission_id: '<mock-value-for-field-"externalId">',
        })

        expect(submitMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {
                externalId: '<mock-value-for-field-"externalId">',
                userPhone: "+49 017659574333",
              },
            },
          })
        )

        expect(submitMutation).toHaveBeenCalledWith(
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
