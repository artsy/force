import { fireEvent, screen } from "@testing-library/react"
import { ArtistRoute } from "Apps/Sell/Routes/ArtistRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Router/useRouter"
import { ArtistRoute_Test_Query$rawResponse } from "__generated__/ArtistRoute_Test_Query.graphql"
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

const submissionMock: ArtistRoute_Test_Query$rawResponse["submission"] = {
  id: "submission-id",
  internalID: "submission-id",
  externalId: "submission-id",
  artist: {
    id: "example-id",
    internalID: "example-id",
    targetSupply: {
      isTargetSupply: true,
    },
    name: "Example Artist",
  },
}

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
    renderWithRelay({
      Submission: () => submissionMock,
    })

    expect(screen.getByText("Add artist name")).toBeInTheDocument()
  })

  describe("artist input", () => {
    it("is required", () => {
      renderWithRelay({
        Submission: () => submissionMock,
      })

      const artistInput = screen.getByPlaceholderText("Enter full name")

      fireEvent.change(artistInput, { target: { value: "Banksy" } })

      expect(artistInput).toBeInTheDocument()

      expect(artistInput).toHaveValue("Banksy")
    })
  })

  describe("Learn more link", () => {
    it("navigates to the artist not eligible page if the artist is not eligible", async () => {
      renderWithRelay({
        Submission: () => submissionMock,
      })

      expect(screen.getByText("Learn more.").attributes["href"].value).toBe(
        "https://support.artsy.net/s/article/Im-an-artist-Can-I-submit-my-own-work-to-sell"
      )
    })
  })

  it("Continue button isn't visible", () => {
    renderWithRelay({
      Submission: () => submissionMock,
    })

    expect(screen.queryByText("Continue")).not.toBeInTheDocument()
  })

  it("Back button isn't visible", () => {
    renderWithRelay({
      Submission: () => submissionMock,
    })

    expect(screen.queryByText("Back")).not.toBeInTheDocument()
  })
})
