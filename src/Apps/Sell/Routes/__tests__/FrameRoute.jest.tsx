import { screen, waitFor } from "@testing-library/react"
import { FrameRoute } from "Apps/Sell/Routes/AdditionalRoutes/FrameRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { FrameRoute_Test_Query$rawResponse } from "__generated__/FrameRoute_Test_Query.graphql"

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

const submissionMock: Partial<
  FrameRoute_Test_Query$rawResponse["submission"]
> = {
  externalId: "externalId",
  myCollectionArtwork: {
    id: "id",
    artworkId: "artworkId",
    isFramed: true,
    framedMetric: "cm",
    framedWidth: "160",
    framedHeight: "100",
    framedDepth: "1",
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
    match: { location: { pathname: "/sell/submissions/externalId/frame" } },
  }))

  submitMutation = jest.fn().mockResolvedValue({})
  ;(useMutation as jest.Mock).mockImplementation(() => {
    return { submitMutation }
  })
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <FrameRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query FrameRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...FrameRoute_submission
        ...SubmissionRoute_submission
      }
    }
  `,
})

describe("FrameRoute", () => {
  it("renders the artist title step", async () => {
    renderWithRelay({})

    await waitFor(() => {
      expect(screen.getByText("Frame")).toBeInTheDocument()
    })
  })

  it("initializes the form with the submission data", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getByTestId("signature-radio-yes")).toBeChecked()
    expect(screen.getByTestId("width-input")).toHaveValue("160")
    expect(screen.getByTestId("height-input")).toHaveValue("100")
    expect(screen.getByTestId("depth-input")).toHaveValue("1")
    expect(screen.getByTestId("dimensionsMetric-radio-cm")).toBeChecked()
  })

  describe("when form is valid", () => {
    it("updates my collection artwork", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      submitMutation.mockClear()
      screen.getByText("Continue").click()

      await waitFor(() => {
        expect(submitMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {
                artworkId: "artworkId",
                isFramed: true,
                framedMetric: "cm",
                framedWidth: "160",
                framedHeight: "100",
                framedDepth: "1",
              },
            },
          })
        )
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
            "/sell/submissions/externalId/shipping-location"
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

        screen.getByText("Continue").click()

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(
            "/sell/submissions/externalId/additional-documents"
          )
        })
      })
    })
  })
})
