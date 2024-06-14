import { screen } from "@testing-library/react"
import { EndingSoonAuctionsFragmentContainer } from "Apps/Auctions/EndingSoonAuctions/EndingSoonAuctions"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"

jest.unmock("react-relay")
jest.mock("Components/ArtworkGrid/ArtworkGrid", () => "ArtworkGrid")
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn().mockReturnValue({ route: { path: "/new-for-you" } }),
}))
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: true })
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: EndingSoonAuctionsFragmentContainer,
  query: graphql`
    query EndingSoonAuctions_test_Query @relay_test_operation {
      viewer: viewer {
        ...EndingSoonAuctionsGrid_viewer
      }
    }
  `,
})

describe("EndingSoonAuctions", () => {
  it("renders", () => {
    renderWithRelay()

    expect(screen.getByText("MetaTags")).toBeInTheDocument()
    expect(
      screen.getByText("Auction Lots for You Ending Soon")
    ).toBeInTheDocument()
  })

  it("displays expected messaging for logged out users", () => {
    ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: false })
    renderWithRelay()

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
        saleArtworksConnection: null,
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
