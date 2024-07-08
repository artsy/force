import { screen } from "@testing-library/react"
import { ArtistNotEligibleRoute } from "Apps/Sell/Routes/ArtistNotEligibleRoute"
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

    expect(screen.getByTestId("add-to-collection")).toHaveAttribute(
      "href",
      "/collector-profile/my-collection/artworks/new"
    )

    expect(screen.getByTestId("view-collection")).toHaveAttribute(
      "href",
      "/sell/submissions/new"
    )
  })

  it("renders inquiry and faq links", () => {
    renderWithRelay({})

    expect(screen.getByText("contact an advisor")).toHaveAttribute(
      "href",
      "/sell/inquiry"
    )

    expect(
      screen.getByText("what our specialists are looking for")
    ).toHaveAttribute("href", "/sell/faq")
  })
})
