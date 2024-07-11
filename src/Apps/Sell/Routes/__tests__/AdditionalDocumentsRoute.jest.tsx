import { screen, waitFor } from "@testing-library/react"
import { AdditionalDocumentsRoute } from "Apps/Sell/Routes/AdditionalRoutes/AdditionalDocumentsRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
let submitMutation: jest.Mock

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

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return { isLoggedIn: true }
  })

  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: {
      location: { pathname: "/submissions/submission-id/additional-documents" },
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
        <AdditionalDocumentsRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query AdditionalDocumentsRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...AdditionalDocumentsRoute_submission
        ...SubmissionRoute_submission
      }
    }
  `,
})

describe("AdditionalDocumentsRoute", () => {
  it("renders the artist title step", async () => {
    renderWithRelay({})

    await waitFor(() => {
      expect(screen.getByText("Additional Documents")).toBeInTheDocument()
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
      it("navigates to next step when the Continue button is clicked", async () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({
            externalId: "externalId",
            state: "APPROVED",
          }),
        })

        screen.getByText("Continue").click()

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(
            "/sell/submissions/externalId/condition"
          )
        })
      })
    })
  })
})
