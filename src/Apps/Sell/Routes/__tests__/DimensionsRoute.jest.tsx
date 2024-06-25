import { fireEvent, screen, waitFor } from "@testing-library/react"
import { DimensionsRoute } from "Apps/Sell/Routes/DimensionsRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { DimensionsRoute_Test_Query$rawResponse } from "__generated__/DimensionsRoute_Test_Query.graphql"
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

const submissionMock: Partial<
  DimensionsRoute_Test_Query$rawResponse["submission"]
> = {
  dimensionsMetric: "in",
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
    match: { location: { pathname: "submissions/submission-id/dimensions" } },
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
        <DimensionsRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query DimensionsRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
        ...DimensionsRoute_submission
      }
    }
  `,
})

describe("DimensionsRoute", () => {
  it("renders the Dimensions step", () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getByText("Artwork dimensions")).toBeInTheDocument()
    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Submit")).toBeInTheDocument()
    expect(screen.getByText("Save & Exit")).toBeInTheDocument()
  })

  it("initializes the form with the submission data", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    await waitFor(() => {
      expect(screen.getByTestId("width-input")).toHaveValue(
        '<mock-value-for-field-"width">'
      )
      expect(screen.getByTestId("height-input")).toHaveValue(
        '<mock-value-for-field-"height">'
      )
      expect(screen.getByTestId("depth-input")).toHaveValue(
        '<mock-value-for-field-"depth">'
      )
    })
  })

  it("saves the submission & navigates to the confirmation step when Submit button is clicked", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    screen.getByText("Submit").click()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/sell2/submissions/<mock-value-for-field-"externalId">/thank-you'
      )

      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              externalId: '<mock-value-for-field-"externalId">',
              height: '<mock-value-for-field-"height">',
              width: '<mock-value-for-field-"width">',
              depth: '<mock-value-for-field-"depth">',
              dimensionsMetric: "in",
              state: "SUBMITTED",
            },
          },
        })
      )
    })
  })
  it("does not save the submission & navigates to the previous step when the back button is clicked", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    screen.getByText("Back").click()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/sell2/submissions/<mock-value-for-field-"externalId">/purchase-history'
      )

      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              externalId: '<mock-value-for-field-"externalId">',
              height: '<mock-value-for-field-"height">',
              width: '<mock-value-for-field-"width">',
              depth: '<mock-value-for-field-"depth">',
              dimensionsMetric: "in",
              state: "SUBMITTED",
            },
          },
        })
      )
    })
  })

  describe("when form is not valid", () => {
    it("disables the continue button", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => ({
          ...submissionMock,
          category: "default",
        }),
      })

      const widthInput = screen.getByTestId("width-input")

      fireEvent.change(widthInput, { target: { value: "" } })

      await flushPromiseQueue()

      await waitFor(() => {
        expect(submitMutation).not.toHaveBeenCalled()
      })
    })
  })
})
