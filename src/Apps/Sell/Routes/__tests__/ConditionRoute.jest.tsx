import { screen, waitFor } from "@testing-library/react"
import { ConditionRoute } from "Apps/Sell/Routes/AdditionalRoutes/ConditionRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { ConditionRoute_Test_Query$rawResponse } from "__generated__/ConditionRoute_Test_Query.graphql"
import { graphql } from "react-relay"

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
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

const submissionMock: Partial<
  ConditionRoute_Test_Query$rawResponse["submission"]
> = {
  externalId: "externalId",
  myCollectionArtwork: {
    id: "id",
    artworkId: "artworkId",
    condition: {
      value: "GOOD",
    },
    conditionDescription: {
      details: "description",
    },
  },
}

const submissionMockInvalid: Partial<
  ConditionRoute_Test_Query$rawResponse["submission"]
> = {
  externalId: "externalId",
  myCollectionArtwork: {
    id: "id",
    artworkId: "artworkId",
    condition: null,
    conditionDescription: {
      details: "",
    },
  },
}

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
      location: { pathname: "/sell/submissions/submission-id/condition" },
    },
  }))

  submitMutation = jest.fn().mockResolvedValue({})
  ;(useMutation as jest.Mock).mockImplementation(() => {
    return { submitMutation }
  })

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
      expect(screen.getByTestId("submission-step-title")).toBeInTheDocument()
    })
  })

  it("initializes the form with the submission data", async () => {
    renderWithRelay({ ConsignmentSubmission: () => submissionMock })

    expect(screen.getByTestId("condition-input")).toHaveValue("GOOD")
    expect(screen.getByTestId("description-input")).toHaveValue("description")
  })

  describe("when form is valid", () => {
    it("updates my collection artwork", async () => {
      renderWithRelay({ ConsignmentSubmission: () => submissionMock })

      screen.getByText("Submit Artwork").click()

      await waitFor(() => {
        expect(submitMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {
                artworkId: "artworkId",
                condition: "GOOD",
                conditionDescription: "description",
              },
            },
          })
        )
      })
    })
  })

  describe("when form is not valid", () => {
    it("does not update the submission", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMockInvalid,
      })

      screen.getByText("Submit Artwork").click()

      await waitFor(() => {
        expect(submitMutation).not.toHaveBeenCalled()
      })
    })
  })

  describe("navigation", () => {
    describe("in APPROVED state", () => {
      it("navigates to the previous step when the Back button is clicked", async () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({
            ...submissionMock,
            state: "APPROVED",
          }),
        })

        screen.getByText("Back").click()

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(
            "/sell/submissions/externalId/additional-documents"
          )
        })
      })

      it("navigates to the thank you screen when Submit Artwork button is clicked", async () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({
            ...submissionMock,
            state: "APPROVED",
          }),
        })

        expect(screen.getByTestId("condition-input")).toHaveValue("GOOD")

        screen.getByText("Submit Artwork").click()

        await waitFor(() => {
          expect(submitMutation).toHaveBeenCalledWith(
            expect.objectContaining({
              variables: {
                input: {
                  artworkId: "artworkId",
                  condition: "GOOD",
                  conditionDescription: "description",
                },
              },
            })
          )

          expect(submitMutation).toHaveBeenCalledWith(
            expect.objectContaining({
              variables: {
                input: {
                  externalId: "externalId",
                  sessionID: undefined,
                  state: "RESUBMITTED",
                },
              },
            })
          )

          expect(mockPush).toHaveBeenCalledWith(
            "/sell/submissions/externalId/thank-you-post-approval"
          )
        })
      })
    })
  })
})
