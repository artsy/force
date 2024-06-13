import { fireEvent, screen } from "@testing-library/react"
import { ArtistRoute } from "Apps/Sell/Routes/ArtistRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Router/useRouter"
import { graphql } from "react-relay"

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
    match: { location: { pathname: "submissions/submission-id/details" } },
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
})
