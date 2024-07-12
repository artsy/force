import { screen, waitFor } from "@testing-library/react"
import { ShippingLocationRoute } from "Apps/Sell/Routes/AdditionalRoutes/ShippingLocationRoute"
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
      location: {
        pathname: "/sell/submissions/submission-id/shipping-location",
      },
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
        <ShippingLocationRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query ShippingLocationRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...ShippingLocationRoute_submission
        ...SubmissionRoute_submission
      }
    }
  `,
})

describe("ShippingLocationRoute", () => {
  it("renders the artist title step", async () => {
    renderWithRelay({})

    await waitFor(() => {
      expect(screen.getByText("Shipping Location")).toBeInTheDocument()
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
          ConsignmentSubmission: () => ({ state: "APPROVED" }),
        })

        mockPush.mockClear()

        screen.getByText("Continue").click()

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(
            '/sell/submissions/<mock-value-for-field-"externalId">/frame'
          )
        })
      })
    })
  })
})
