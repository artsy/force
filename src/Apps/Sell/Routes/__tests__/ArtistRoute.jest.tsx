import { screen } from "@testing-library/react"
import { fireEvent, waitFor } from "@testing-library/react"
import { ArtistRoute } from "Apps/Sell/Routes/ArtistRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Router/useRouter"
import { DeepPartial } from "Utils/typeSupport"
import { ArtistRoute_Test_Query$rawResponse } from "__generated__/ArtistRoute_Test_Query.graphql"
import { graphql } from "react-relay"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { location: { query: {} } } })),
}))
jest.unmock("react-relay")

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))

const submissionMock: DeepPartial<
  ArtistRoute_Test_Query$rawResponse["submission"]
> = {
  internalID: "example",
  artist: {
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
  }))
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <ArtistRoute submission={props.submission} />
  },
  query: graphql`
    query ArtistRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...ArtistRoute_submission
      }
    }
  `,
})

describe("ArtistRoute", () => {
  it("renders the artist step", async () => {
    renderWithRelay({
      submission: () => submissionMock,
    })

    await waitFor(() => {
      expect(screen.getByText("Add artist name")).toBeInTheDocument()
    })
  })

  describe("artist input", () => {
    it("is required", async () => {
      renderWithRelay({
        submission: () => submissionMock,
      })

      await waitFor(async () => {
        const artistInput = screen.getByPlaceholderText("Enter full name")

        fireEvent.change(artistInput, { target: { value: "Banksy" } })

        expect(artistInput).toBeInTheDocument()

        expect(artistInput).toHaveValue("Banksy")
      })
    })
  })

  describe("Learn more link", () => {
    it("navigates to the artist not eligible page if the artist is not eligible", async () => {
      renderWithRelay({
        submission: () => submissionMock,
      })

      expect(screen.getByText("Learn more.").attributes["href"].value).toBe(
        "https://support.artsy.net/s/article/Im-an-artist-Can-I-submit-my-own-work-to-sell"
      )
    })
  })
})
