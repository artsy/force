import { fireEvent, screen } from "@testing-library/react"
import { ArtistRoute } from "Apps/Sell/Routes/ArtistRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { graphql } from "react-relay"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))

let pathnameMock: string

beforeAll(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return { isLoggedIn: true }
  })

  pathnameMock = "/submissions/submission-id/artist"

  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: { location: { pathname: pathnameMock } },
  }))
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <ArtistRoute submission={props.submission} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query ArtistRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
        ...ArtistRoute_submission
      }
    }
  `,
})

describe("ArtistRoute", () => {
  it("renders the artist step", () => {
    renderWithRelay({})

    expect(screen.getByText("Add artist name")).toBeInTheDocument()
  })

  describe("artist input", () => {
    it("is required", () => {
      renderWithRelay({})

      const artistInput = screen.getByPlaceholderText("Enter full name")

      fireEvent.change(artistInput, { target: { value: "Banksy" } })

      expect(artistInput).toBeInTheDocument()

      expect(artistInput).toHaveValue("Banksy")
    })
  })

  describe("Learn more link", () => {
    it("navigates to the artist not eligible page if the artist is not eligible", async () => {
      renderWithRelay({})

      expect(screen.getByText("Learn more.").attributes["href"].value).toBe(
        "https://support.artsy.net/s/article/Im-an-artist-Can-I-submit-my-own-work-to-sell"
      )
    })
  })

  it("Continue button isn't visible", () => {
    renderWithRelay({})

    expect(screen.queryByText("Continue")).not.toBeInTheDocument()
  })

  it("Back button isn't visible", () => {
    renderWithRelay({})

    expect(screen.queryByText("Back")).not.toBeInTheDocument()
  })

  describe("when creating a new submission", () => {
    beforeAll(() => {
      pathnameMock = "/submissions/new"
    })

    it("calls createSubmission when a new artist is selected", async () => {
      renderWithRelay({})

      const artistInput = screen.getByPlaceholderText("Enter full name")

      fireEvent.change(artistInput, { target: { value: "Banksy" } })

      expect(artistInput).toHaveValue("Banksy")
    })
  })
})
