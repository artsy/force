import { fireEvent, screen, waitFor } from "@testing-library/react"
import { DetailsRoute } from "Apps/Sell/Routes/DetailsRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { DetailsRoute_Test_Query$rawResponse } from "__generated__/DetailsRoute_Test_Query.graphql"
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
  DetailsRoute_Test_Query$rawResponse["submission"]
> = {
  category: "Painting",
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
    match: { location: { pathname: "submissions/submission-id/details" } },
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
        <DetailsRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query DetailsRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
        ...DetailsRoute_submission
      }
    }
  `,
})

describe("DetailsRoute", () => {
  it("renders the Details step", () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getByText("Artwork details")).toBeInTheDocument()
    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Continue")).toBeInTheDocument()
    expect(screen.getByText("Save & Exit")).toBeInTheDocument()
  })

  it("initializes the form with the submission data", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    await waitFor(() => {
      expect(screen.getByTestId("year-input")).toHaveValue(
        '<mock-value-for-field-"year">'
      )
      expect(screen.getByTestId("medium-input")).toHaveValue(
        '<mock-value-for-field-"medium">'
      )
    })
  })

  it("saves the submission & navigates to the next step when Continue button is clicked", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    screen.getByText("Continue").click()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/sell/submissions/<mock-value-for-field-"externalId">/details'
      )

      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              externalId: '<mock-value-for-field-"externalId">',
              year: '<mock-value-for-field-"year">',
              category: "PAINTING",
              medium: '<mock-value-for-field-"medium">',
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
        '/sell/submissions/<mock-value-for-field-"externalId">/photos'
      )

      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              externalId: '<mock-value-for-field-"externalId">',
              year: '<mock-value-for-field-"year">',
              category: "PAINTING",
              medium: '<mock-value-for-field-"medium">',
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

      const mediumInput = screen.getByTestId("medium-input")

      fireEvent.change(mediumInput, { target: { value: "" } })

      await flushPromiseQueue()

      await waitFor(() => {
        expect(submitMutation).not.toHaveBeenCalled()
      })
    })
  })
})
