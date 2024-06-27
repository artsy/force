import { screen, waitFor } from "@testing-library/react"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { PhoneNumberRoute } from "Apps/Sell/Routes/PhoneNumberRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { PhoneNumberRoute_Test_Query$rawResponse } from "__generated__/PhoneNumberRoute_Test_Query.graphql"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
let submitMutation: jest.Mock
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

  it("saves the submission & navigates to the confirmation step when Submit button is clicked", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    screen.getByText("Submit Artwork").click()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/sell2/submissions/<mock-value-for-field-"externalId">/thank-you'
      )

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
    })
  })
})
