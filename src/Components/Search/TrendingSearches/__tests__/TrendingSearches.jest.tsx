import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useTracking } from "react-tracking"
import { TrendingSearches } from "../TrendingSearches"

jest.mock("Utils/Hooks/useClientQuery", () => ({ useClientQuery: jest.fn() }))
jest.mock("react-tracking")

jest.mock("Components/Artwork/SaveButton/SaveButton", () => ({
  SaveButtonFragmentContainer: () => {
    return <button type="button">Save</button>
  },
}))

const BANKSY_ID = "4dd1584de0091e000100207c"
const RABARAMA_ID = "69ef1a335bdeb20008bcebdc"

// Mirrors the searchDropdown.trending shape served by Metaphysics
const trendingWindow = (label: string) => {
  return {
    label,
    artists: [
      {
        internalID: BANKSY_ID,
        artist: {
          internalID: BANKSY_ID,
          slug: "banksy",
          name: "Banksy",
          href: "/artist/banksy",
          initials: "B",
          coverArtwork: null,
        },
      },
    ],
    artworks: [
      {
        internalID: RABARAMA_ID,
        artwork: {
          internalID: RABARAMA_ID,
          slug: "rabarama-dhyana",
          href: "/artwork/rabarama-dhyana",
          title: "Dhyana",
          date: "2019",
          artistNames: "Rabarama",
          saleMessage: "US$10,000",
          partner: { name: "Schellmann Art" },
          image: {
            resized: {
              src: "https://example.com/image.jpg",
              srcSet: "https://example.com/image.jpg 1x",
              width: 165,
              height: 230,
            },
          },
        },
      },
    ],
  }
}

const mockData = {
  searchDropdown: {
    oneDay: trendingWindow("Today"),
    sevenDays: trendingWindow("Past 7 Days"),
    thirtyDays: trendingWindow("Past 30 Days"),
  },
}

const RECENT_SEARCHES_KEY = "artsy.recentSearches"

const seedRecentSearches = (terms: string[]) => {
  localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(
      terms.map(label => {
        return { label, href: `/search?term=${encodeURIComponent(label)}` }
      }),
    ),
  )
}

const mockTrackEvent = jest.fn()

describe("TrendingSearches", () => {
  beforeEach(() => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
    })
    ;(useTracking as jest.Mock).mockReturnValue({ trackEvent: mockTrackEvent })
  })

  afterEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it("renders the section labels and the three time-window tabs", () => {
    render(<TrendingSearches />)

    expect(screen.getByText("Trending Artists")).toBeInTheDocument()
    expect(screen.getByText("Trending Artworks")).toBeInTheDocument()
    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.getByText("Past 7 Days")).toBeInTheDocument()
    expect(screen.getByText("Past 30 Days")).toBeInTheDocument()
  })

  it("hides the recent searches section when there are no recent searches", () => {
    render(<TrendingSearches />)

    expect(screen.queryByText("Recent Searches")).not.toBeInTheDocument()
  })

  it("caps recent searches at seven terms", () => {
    seedRecentSearches([
      "banksy",
      "yayoi kusama",
      "picasso prints",
      "photography",
      "david hockney",
      "monet",
      "sculpture",
      "street art",
    ])

    render(<TrendingSearches />)

    // Eight terms are stored; the seventh renders, the eighth does not
    expect(screen.getByText("sculpture")).toBeInTheDocument()
    expect(screen.queryByText("street art")).not.toBeInTheDocument()
  })

  it("renders recent searches as removable chips", async () => {
    seedRecentSearches(["banksy", "monet"])

    render(<TrendingSearches />)

    expect(screen.getByText("Recent Searches")).toBeInTheDocument()
    expect(screen.getByText("banksy")).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole("button", {
        name: "Remove banksy from recent searches",
      }),
    )

    expect(screen.queryByText("banksy")).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)!)).toEqual([
      { label: "monet", href: "/search?term=monet" },
    ])
  })

  it("links each recent search chip to the destination that was visited", () => {
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify([
        { label: "White Cube", href: "/partner/white-cube" },
        { label: "street art", href: "/search?term=street%20art" },
      ]),
    )

    render(<TrendingSearches />)

    // An entity that was picked from autosuggest links to its own page…
    expect(screen.getByRole("link", { name: "White Cube" })).toHaveAttribute(
      "href",
      "/partner/white-cube",
    )

    // …while a submitted query links to the search results page
    expect(screen.getByRole("link", { name: "street art" })).toHaveAttribute(
      "href",
      "/search?term=street%20art",
    )
  })

  it("tracks a recent search chip click with its recorded metadata", async () => {
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify([
        { label: "banksy", href: "/search?term=banksy" },
        {
          label: "White Cube",
          href: "/partner/white-cube",
          item_type: "Gallery",
          item_id: "white-cube-id",
        },
      ]),
    )

    render(<TrendingSearches />)

    await userEvent.click(screen.getByRole("link", { name: "White Cube" }))

    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: "recentSearchesRail",
      destination_path: "/partner/white-cube",
      query: "White Cube",
      item_id: "white-cube-id",
      item_number: 1,
      item_type: "Gallery",
    })
  })

  it("tracks a query chip click as a search item without entity metadata", async () => {
    seedRecentSearches(["street art"])

    render(<TrendingSearches />)

    await userEvent.click(screen.getByRole("link", { name: "street art" }))

    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: "recentSearchesRail",
      destination_path: "/search?term=street%20art",
      query: "street art",
      item_id: "",
      item_number: 0,
      item_type: "Search",
    })
  })

  it("renders a trending artist avatar linking to the artist page", () => {
    render(<TrendingSearches />)

    expect(screen.getByRole("link", { name: /Banksy/ })).toHaveAttribute(
      "href",
      "/artist/banksy",
    )
  })

  it("renders an artwork card with artist, title, partner, price, and save button", () => {
    render(<TrendingSearches />)

    expect(screen.getByText("Rabarama")).toBeInTheDocument()
    expect(screen.getByText("Dhyana, 2019")).toBeInTheDocument()
    expect(screen.getByText("Schellmann Art")).toBeInTheDocument()
    expect(screen.getByText("US$10,000")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("tracks a rail impression per section when the panel opens", () => {
    seedRecentSearches(["banksy"])

    render(<TrendingSearches />)

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: ActionType.railViewed,
        context_module: "recentSearchesRail",
      }),
    )
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: ActionType.railViewed,
        context_module: ContextModule.trendingArtistsRail,
      }),
    )
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: ActionType.railViewed,
        context_module: "trendingArtworksRail",
      }),
    )
  })

  it("does not track a recent searches impression when there are none", () => {
    render(<TrendingSearches />)

    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ context_module: "recentSearchesRail" }),
    )
  })

  it("does not track impressions when the host marks the session as already counted", () => {
    render(<TrendingSearches shouldTrackImpressions={false} />)

    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action: ActionType.railViewed }),
    )
  })

  it("renders nothing and counts nothing while the query is loading", () => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    })
    seedRecentSearches(["banksy"])

    render(<TrendingSearches />)

    // No skeleton state: the panel waits for the API response, so not even
    // the recents rail shows or counts before it arrives
    expect(screen.queryByText("Recent Searches")).not.toBeInTheDocument()
    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action: ActionType.railViewed }),
    )
  })

  it("renders nothing when the query returns no data", () => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
    })
    seedRecentSearches(["banksy"])

    render(<TrendingSearches />)

    expect(screen.queryByText("Recent Searches")).not.toBeInTheDocument()
  })

  it("renders nothing for a loaded-but-empty response without recents", () => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: {
        searchDropdown: {
          oneDay: { label: "Today", artists: [], artworks: [] },
          sevenDays: { label: "Past 7 Days", artists: [], artworks: [] },
          thirtyDays: { label: "Past 30 Days", artists: [], artworks: [] },
        },
      },
      loading: false,
    })

    render(<TrendingSearches />)

    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
    expect(screen.queryByText("Trending Artworks")).not.toBeInTheDocument()
    expect(screen.queryByText("Today")).not.toBeInTheDocument()
    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action: ActionType.railViewed }),
    )
  })

  it("still shows recent searches when a loaded response has empty rails", () => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: {
        searchDropdown: {
          oneDay: { label: "Today", artists: [], artworks: [] },
          sevenDays: { label: "Past 7 Days", artists: [], artworks: [] },
          thirtyDays: { label: "Past 30 Days", artists: [], artworks: [] },
        },
      },
      loading: false,
    })
    seedRecentSearches(["banksy"])

    render(<TrendingSearches />)

    expect(screen.getByText("Recent Searches")).toBeInTheDocument()
    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
  })

  it("closes the panel on a plain chip click but not on a modified click", async () => {
    seedRecentSearches(["banksy"])
    const onNavigate = jest.fn()

    render(<TrendingSearches onNavigate={onNavigate} />)

    await userEvent.click(screen.getByRole("link", { name: "banksy" }), {
      metaKey: true,
    })

    // A cmd+click opens a new tab; the panel must stay put (but still tracks)
    expect(onNavigate).not.toHaveBeenCalled()
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ action: ActionType.selectedItemFromSearch }),
    )

    await userEvent.click(screen.getByRole("link", { name: "banksy" }))

    expect(onNavigate).toHaveBeenCalled()
  })

  it("tracks a trending artist click", async () => {
    render(<TrendingSearches />)

    await userEvent.click(screen.getByRole("link", { name: /Banksy/ }))

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: ActionType.clickedArtistGroup,
        context_module: ContextModule.trendingArtistsRail,
        destination_page_owner_type: OwnerType.artist,
        destination_page_owner_id: BANKSY_ID,
        destination_page_owner_slug: "banksy",
        horizontal_slide_position: expect.any(Number),
        type: "thumbnail",
      }),
    )
  })

  it("tracks a trending artwork click", async () => {
    render(<TrendingSearches />)

    await userEvent.click(screen.getByText("Rabarama"))

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: ActionType.clickedArtworkGroup,
        context_module: "trendingArtworksRail",
        destination_page_owner_type: OwnerType.artwork,
        destination_page_owner_id: RABARAMA_ID,
        destination_page_owner_slug: "rabarama-dhyana",
        horizontal_slide_position: expect.any(Number),
        type: "thumbnail",
      }),
    )
  })

  it("switches windows when a tab is clicked", async () => {
    render(<TrendingSearches />)

    await userEvent.click(screen.getByText("Past 30 Days"))

    expect(
      screen.getByRole("button", { name: "Past 30 Days" }),
    ).toHaveAttribute("aria-pressed", "true")
  })

  it("tracks a time-window switch", async () => {
    render(<TrendingSearches />)

    await userEvent.click(screen.getByText("Past 30 Days"))

    expect(mockTrackEvent).toHaveBeenCalledWith({
      action_type: ActionType.tappedNavigationTab,
      context_module: "trendingSearches",
      subject: "Past 30 Days",
    })
  })

  it("does not track a re-click of the already-active tab", async () => {
    render(<TrendingSearches />)

    await userEvent.click(screen.getByText("Today"))

    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({
        action_type: ActionType.tappedNavigationTab,
      }),
    )
  })
})
