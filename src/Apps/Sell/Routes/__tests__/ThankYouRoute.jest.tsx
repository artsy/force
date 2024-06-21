import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { ThankYouRoute } from "Apps/Sell/Routes/ThankYouRoute"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { graphql } from "react-relay"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.unmock("react-relay")

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))

beforeEach(() => {
  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: {
      location: { pathname: "submissions/submission-id/thank-you" },
    },
  }))
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <ThankYouRoute />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query ThankYouRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
      }
    }
  `,
})

describe("ThankYouRoute", () => {
  it("renders text and links", () => {
    renderWithRelay({})

    expect(screen.getByText("Submit Another Work")).toBeInTheDocument()

    expect(
      screen.getByText("Thank you for submitting your artwork")
    ).toBeInTheDocument()

    expect(screen.getByText("Submit Another Work")).toBeInTheDocument()

    expect(
      screen.getByText("View Artwork in My Collection")
    ).toBeInTheDocument()

    /*  expect(screen.getByText("Submit Another Work")).toHaveAttribute(
      "href",
      "/sell2/submissions/new"
    )

    expect(screen.getByText("View Artwork in My Collection")).toHaveAttribute(
      "href",
      "/collector-profile/my-collection"
    ) */
  })
})
