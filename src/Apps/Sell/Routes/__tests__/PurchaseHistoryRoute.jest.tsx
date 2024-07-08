import { screen, waitFor } from "@testing-library/react"
import { PurchaseHistoryRoute } from "Apps/Sell/Routes/PurchaseHistoryRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { PurchaseHistoryRoute_Test_Query$rawResponse } from "__generated__/PurchaseHistoryRoute_Test_Query.graphql"
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
  PurchaseHistoryRoute_Test_Query$rawResponse["submission"]
> = {
  provenance: "Other",
  signature: false,
}

const submissionMock2: Partial<
  PurchaseHistoryRoute_Test_Query$rawResponse["submission"]
> = {
  provenance: "",
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
      location: { pathname: "submissions/submission-id/purchase-history" },
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
        <PurchaseHistoryRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query PurchaseHistoryRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
        ...PurchaseHistoryRoute_submission
      }
    }
  `,
})

describe("PurchaseHistoryRoute", () => {
  it("renders the Purchase History step", () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock2,
    })

    expect(
      screen.getByText("Where did you purchase the artwork?")
    ).toBeInTheDocument()
    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Continue")).toBeInTheDocument()
    expect(screen.getByText("Save & Exit")).toBeInTheDocument()
  })

  it("initially displayes the form epty", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => {},
    })

    await waitFor(() => {
      expect(screen.getByTestId("provenance-input")).toHaveValue("")
      expect(screen.getByTestId("signature-radio-no")).not.toBeChecked()
      expect(screen.getByTestId("signature-radio-yes")).not.toBeChecked()
    })
  })

  it("initializes the form with the submission data", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    await waitFor(() => {
      expect(screen.getByTestId("provenance-input")).toHaveValue("Other")
      expect(screen.getByTestId("signature-radio-no")).toBeChecked()
      expect(screen.getByTestId("signature-radio-yes")).not.toBeChecked()
    })
  })

  it("saves the submission & navigates to the next step when Continue button is clicked", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    screen.getByText("Continue").click()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/sell/submissions/<mock-value-for-field-"externalId">/dimensions'
      )

      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              externalId: '<mock-value-for-field-"externalId">',
              provenance: "Other",
              signature: false,
            },
          },
        })
      )
    })
  })

  it("saves the submission & navigates to the previous step when the back button is clicked", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    screen.getByText("Back").click()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/sell/submissions/<mock-value-for-field-"externalId">/details'
      )

      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              externalId: '<mock-value-for-field-"externalId">',
              provenance: "Other",
              signature: false,
            },
          },
        })
      )
    })
  })

  describe("when form is empty", () => {
    it("can navigate to the next step when form is empty", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => ({ provenance: "", signature: null }),
      })

      screen.getByText("Continue").click()

      await flushPromiseQueue()

      await waitFor(() => {
        expect(submitMutation).toHaveBeenCalled()
      })
    })
  })
})
