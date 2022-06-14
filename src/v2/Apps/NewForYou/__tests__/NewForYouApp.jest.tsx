import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { NewForYouAppFragmentContainer } from "../NewForYouApp"
import { useSystemContext } from "v2/System"

jest.unmock("react-relay")
jest.mock("v2/Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("v2/System", () => ({
  useSystemContext: jest.fn(),
}))

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: true })
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: NewForYouAppFragmentContainer,
  query: graphql`
    query NewForYouApp_test_Query @relay_test_operation {
      viewer: viewer {
        ...NewForYouArtworksGrid_viewer
      }
    }
  `,
})

describe("NewForYouApp", () => {
  it("renders", () => {
    renderWithRelay()

    expect(screen.getByText("MetaTags")).toBeInTheDocument()
    expect(screen.getByText("New Works For You")).toBeInTheDocument()
  })

  it("displays expected messaging for logged out users", () => {
    ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: false })
    renderWithRelay()

    expect(
      screen.getByText(/(^Already have an account\?)/g)
    ).toBeInTheDocument()
    expect(screen.getByText(/(^Log in)/g)).toBeInTheDocument()
    expect(
      screen.getByText(/(to see your personalized recommendations\.$)/g)
    ).toBeInTheDocument()
  })

  it("does not display messaging for a logged in user", () => {
    renderWithRelay()

    expect(
      screen.queryByText(/(^Already have an account\?)/g)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/(^Log in)/g)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/(to see your personalized recommendations\.$)/g)
    ).not.toBeInTheDocument()
  })

  it("shows expected no-results messaging", () => {
    renderWithRelay({
      Viewer: () => ({
        artworksForUser: null,
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
