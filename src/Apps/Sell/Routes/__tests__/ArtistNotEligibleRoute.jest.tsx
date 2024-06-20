import { screen } from "@testing-library/react"
import { ArtistNotEligibleRoute } from "Apps/Sell/Routes/ArtistNotEligibleRoute"
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

let pathnameMock: string

beforeAll(() => {
  pathnameMock = "/artists/artist-id/artist"

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
    return <ArtistNotEligibleRoute artist={props.artist} />
  },
  query: graphql`
    query ArtistNotEligibleRoute_Test_Query @raw_response_type {
      artist(id: "artist-id") {
        ...ArtistNotEligibleRoute_artist
      }
    }
  `,
})

describe("ArtistNotEligibleRoute", () => {
  it("renders text and links", () => {
    renderWithRelay({})

    expect(
      screen.getByText(
        "This artist isn’t currently eligible to sell on our platform"
      )
    ).toBeInTheDocument()

    expect(screen.getByText("Add to My Collection")).toBeInTheDocument()

    expect(screen.getByText("Add Another Artist")).toBeInTheDocument()
  })
})
