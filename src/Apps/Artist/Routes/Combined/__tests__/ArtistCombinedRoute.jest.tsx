import { render, waitFor } from "@testing-library/react"
import { ArtistCombinedRouteFragmentContainer } from "Apps/Artist/Routes/Combined/ArtistCombinedRoute"
import { useRouter } from "System/Hooks/useRouter"
import { useJump } from "Utils/Hooks/useJump"

jest.mock("System/Hooks/useRouter")
jest.mock("Utils/Hooks/useJump", () => ({
  ...jest.requireActual("Utils/Hooks/useJump"),
  useJump: jest.fn(),
}))
jest.mock("Utils/Hooks/useSectionReadiness", () => ({
  useSectionReadiness: () => ({
    lazy: {},
    markReady: jest.fn(),
    waitUntil: () => Promise.resolve(),
    navigating: {},
  }),
}))
jest.mock("Utils/Hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: () => ({ ref: { current: null } }),
}))
jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: () => false,
}))
jest.mock("Apps/Artist/Routes/AuctionResults/ArtistAuctionResults", () => ({
  ArtistAuctionResultsQueryRenderer: () => null,
  useScrollToTopOfAuctionResults: () => ({ handleScrollToTop: jest.fn() }),
}))
jest.mock("Apps/Artist/Routes/AuctionResults/Components/MarketStats", () => ({
  MarketStatsQueryRenderer: () => null,
}))
jest.mock("Apps/Artist/Routes/Combined/Components/ArtistCombinedNav", () => ({
  ArtistCombinedNav: () => null,
}))
jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsGrid",
  () => ({ ArtistEditorialNewsGridQueryRenderer: () => null }),
)
jest.mock("Apps/Artist/Routes/Overview/Components/ArtistOverview", () => ({
  ArtistOverviewQueryRenderer: () => null,
}))
jest.mock("Apps/Artist/Routes/Overview/Components/ArtistSocialRail", () => ({
  ArtistSocialRailQueryRenderer: () => null,
}))
jest.mock(
  "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter",
  () => ({ ArtistArtworkFilterQueryRenderer: () => null }),
)

const mockUseRouter = useRouter as jest.Mock
const mockUseJump = useJump as jest.Mock

const artist = { internalID: "artist-id", instagramHandle: null } as any

const setLocation = (location: { hash: string; key?: string }) => {
  mockUseRouter.mockImplementation(() => ({
    match: {
      location: { pathname: "/artist/example", search: "", ...location },
    },
  }))
}

describe("ArtistCombinedRoute", () => {
  const jumpTo = jest.fn()

  beforeEach(() => {
    jumpTo.mockClear()
    mockUseJump.mockImplementation(() => ({ jumpTo }))
  })

  it("jumps to the market signals section when the location has its hash", async () => {
    setLocation({ hash: "#JUMP--marketSignalsTop", key: "first" })

    render(<ArtistCombinedRouteFragmentContainer artist={artist} />)

    await waitFor(() => {
      expect(jumpTo).toHaveBeenCalledWith("marketSignalsTop", { offset: 40 })
    })
  })

  it("jumps again on a later navigation to the same hash", async () => {
    setLocation({ hash: "#JUMP--marketSignalsTop", key: "first" })

    const { rerender } = render(
      <ArtistCombinedRouteFragmentContainer artist={artist} />,
    )

    await waitFor(() => expect(jumpTo).toHaveBeenCalledTimes(1))

    setLocation({ hash: "#JUMP--marketSignalsTop", key: "second" })
    rerender(<ArtistCombinedRouteFragmentContainer artist={artist} />)

    await waitFor(() => expect(jumpTo).toHaveBeenCalledTimes(2))
  })

  it("does not jump again when re-rendering the same navigation", async () => {
    setLocation({ hash: "#JUMP--marketSignalsTop", key: "first" })

    const { rerender } = render(
      <ArtistCombinedRouteFragmentContainer artist={artist} />,
    )

    await waitFor(() => expect(jumpTo).toHaveBeenCalledTimes(1))

    const nextJumpTo = jest.fn()
    mockUseJump.mockImplementation(() => ({ jumpTo: nextJumpTo }))
    rerender(<ArtistCombinedRouteFragmentContainer artist={artist} />)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(jumpTo).toHaveBeenCalledTimes(1)
    expect(nextJumpTo).not.toHaveBeenCalled()
  })

  it("jumps on a fresh page load where the location has no key", async () => {
    setLocation({ hash: "#JUMP--marketSignalsTop" })

    const { rerender } = render(
      <ArtistCombinedRouteFragmentContainer artist={artist} />,
    )

    await waitFor(() => expect(jumpTo).toHaveBeenCalledTimes(1))

    rerender(<ArtistCombinedRouteFragmentContainer artist={artist} />)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(jumpTo).toHaveBeenCalledTimes(1)
  })

  it("jumps to the about section when the location has its hash", async () => {
    setLocation({ hash: "#JUMP--artistAboutTop", key: "first" })

    render(<ArtistCombinedRouteFragmentContainer artist={artist} />)

    await waitFor(() => {
      expect(jumpTo).toHaveBeenCalledWith("artistAboutTop", { offset: 40 })
    })
  })

  it("removes the hash from the URL after jumping", async () => {
    const replaceState = jest.spyOn(window.history, "replaceState")
    setLocation({ hash: "#JUMP--marketSignalsTop", key: "first" })

    render(<ArtistCombinedRouteFragmentContainer artist={artist} />)

    await waitFor(() => {
      expect(replaceState).toHaveBeenCalledWith({}, "", "/artist/example")
    })

    replaceState.mockRestore()
  })
})
