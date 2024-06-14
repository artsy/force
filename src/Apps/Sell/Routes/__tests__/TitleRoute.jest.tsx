import { screen } from "@testing-library/react"
import { fireEvent, waitFor } from "@testing-library/react"
import { TitleRoute } from "Apps/Sell/Routes/TitleRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Router/useRouter"
import { graphql } from "react-relay"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock("System/Router/useRouter", () => ({
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
    match: { location: { pathname: "/submissions/submission-id/title" } },
  }))
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <TitleRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query TitleRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...TitleRoute_submission
        ...SubmissionRoute_submission
      }
    }
  `,
})

describe("TitleRoute", () => {
  it("renders the artist title step", async () => {
    renderWithRelay({})

    await waitFor(() => {
      expect(screen.getByText("Add artwork title")).toBeInTheDocument()
    })
  })

  describe("artist title input", () => {
    it("is required", async () => {
      renderWithRelay({})

      await waitFor(async () => {
        const artistTitleInput = screen.getByPlaceholderText("Artwork Title")

        fireEvent.change(artistTitleInput, { target: { value: "Banksy" } })

        expect(artistTitleInput).toBeInTheDocument()

        expect(artistTitleInput).toHaveValue("Banksy")
      })
    })
  })
})
