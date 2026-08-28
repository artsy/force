import { ActionType, ContextModule } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useFlag } from "@unleash/proxy-client-react"
import { useRouter } from "System/Hooks/useRouter"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useTracking } from "react-tracking"
import { SearchBarInput } from "../SearchBarInput"
import { parseFilterQuery } from "../utils/parseFilterQuery"

jest.mock("@unleash/proxy-client-react", () => ({ useFlag: jest.fn() }))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  AutocompleteInput: ({
    value,
    placeholder,
    options,
    onChange,
    onFocus,
    onPaste,
    onSubmit,
    renderOption,
  }) => (
    <div>
      <input
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onPaste={onPaste}
        onKeyDown={event => {
          if (event.key === "Enter") {
            onSubmit()
          }
        }}
      />
      <div>
        {options.map((option, i) => (
          <div key={`${option.typename}-${option.value}-${i}`}>
            {renderOption(option)}
          </div>
        ))}
      </div>
    </div>
  ),
  useDidMount: () => true,
}))

jest.mock("System/Hooks/useRouter", () => ({ useRouter: jest.fn() }))

jest.mock("../utils/parseFilterQuery", () => ({
  parseFilterQuery: jest.fn(
    jest.requireActual("../utils/parseFilterQuery").parseFilterQuery,
  ),
}))

jest.mock("Utils/Hooks/useClientQuery", () => ({ useClientQuery: jest.fn() }))
jest.mock("react-tracking")

jest.mock("../SuggestionItem/SuggestionItem", () => ({
  SuggestionItem: ({ option, onClick, onQuickNavClick }) => (
    <>
      <a href={option.href} onClick={event => onClick(option, event)}>
        {option.text}
      </a>
      {option.showAuctionResultsButton && (
        <button
          type="button"
          onClick={(event: any) => onQuickNavClick(option, event)}
        >
          Auction Results
        </button>
      )}
    </>
  ),
}))

const mockPush = jest.fn()
const mockTrackEvent = jest.fn()

// Consumed by the nested TrendingSearches, which only renders once trending
// data is present. Artworks stay empty so the card's SaveButton stays out of
// this suite.
const trendingWindow = (label: string) => {
  return {
    label,
    artists: [
      {
        internalID: "banksy-id",
        artist: {
          internalID: "banksy-id",
          slug: "banksy",
          name: "Banksy",
          href: "/artist/banksy",
          initials: "B",
          coverArtwork: null,
        },
      },
    ],
    artworks: [],
  }
}

const TRENDING_DROPDOWN = {
  oneDay: trendingWindow("Today"),
  sevenDays: trendingWindow("Past 7 Days"),
  thirtyDays: trendingWindow("Past 30 Days"),
}

describe("SearchBarInput", () => {
  beforeEach(() => {
    // The trending panel ships behind this flag; the tests cover the
    // flag-on behavior except where they disable it explicitly
    ;(useFlag as jest.Mock).mockImplementation((flag: string) => {
      return flag === "onyx_trending-searches"
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      match: { location: { pathname: "/search" } },
      router: { push: mockPush },
    })
    ;(useTracking as jest.Mock).mockReturnValue({ trackEvent: mockTrackEvent })
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: {
        searchDropdown: TRENDING_DROPDOWN,
        viewer: {
          searchConnection: {
            edges: [
              {
                highlights: null,
                node: {
                  __typename: "Artist",
                  coverArtwork: null,
                  displayLabel: "Andy Warhol",
                  displayType: "Artist",
                  href: "/artist/andy-warhol",
                  imageUrl: null,
                  internalID: "andy-warhol",
                  statuses: { auctionLots: false },
                },
              },
            ],
          },
        },
      },
      refetch: jest.fn(() => ({
        promise: Promise.resolve({
          viewer: { searchConnection: { edges: [] } },
        }),
      })),
      loading: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it("renders without a search term (routes without ?term= pass undefined)", () => {
    render(<SearchBarInput searchTerm={undefined as unknown as string} />)

    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("passes the experiment variant to autosuggest", () => {
    render(<SearchBarInput searchTerm="andy" />)

    expect(useClientQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({
          variant: "experiment",
        }),
      }),
    )
  })

  it("redirects on a normal suggestion click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }))
    expect(mockPush).toHaveBeenCalledWith("/artist/andy-warhol")
  })

  it("tracks selectedItemFromSearch on suggestion click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }))
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
  })

  it("tracks selection but does not redirect on cmd+click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }), {
      metaKey: true,
    })
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("tracks selection but does not redirect on ctrl+click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }), {
      ctrlKey: true,
    })
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("tracks selection but does not redirect on shift+click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }), {
      shiftKey: true,
    })
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("tracks selection but does not redirect on alt+click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }), {
      altKey: true,
    })
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("tracks selection but does not redirect on middle click", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }), {
      button: 1,
    })
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.topTab,
      destination_path: "/artist/andy-warhol",
      query: "andy",
      item_id: "andy-warhol",
      item_number: 0,
      item_type: "Artist",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  describe("quick nav click", () => {
    beforeEach(() => {
      ;(useClientQuery as jest.Mock).mockReturnValue({
        data: {
          viewer: {
            searchConnection: {
              edges: [
                {
                  highlights: null,
                  node: {
                    __typename: "Artist",
                    coverArtwork: null,
                    displayLabel: "Andy Warhol",
                    displayType: "Artist",
                    href: "/artist/andy-warhol",
                    imageUrl: null,
                    internalID: "andy-warhol",
                    statuses: { auctionLots: true },
                  },
                },
              ],
            },
          },
        },
        refetch: jest.fn(() => ({
          promise: Promise.resolve({
            viewer: { searchConnection: { edges: [] } },
          }),
        })),
      })
    })

    it("redirects to auction results on click", async () => {
      render(<SearchBarInput searchTerm="andy" />)
      await userEvent.click(
        screen.getByRole("button", { name: "Auction Results" }),
      )
      expect(mockPush).toHaveBeenCalledWith(
        "/artist/andy-warhol/auction-results",
      )
    })

    it("does not track selectedItemFromSearch on click", async () => {
      render(<SearchBarInput searchTerm="andy" />)
      await userEvent.click(
        screen.getByRole("button", { name: "Auction Results" }),
      )
      expect(mockTrackEvent).not.toHaveBeenCalledWith(
        expect.objectContaining({ action: ActionType.selectedItemFromSearch }),
      )
    })

    it("does not redirect on cmd+click", async () => {
      render(<SearchBarInput searchTerm="andy" />)
      await userEvent.click(
        screen.getByRole("button", { name: "Auction Results" }),
        { metaKey: true },
      )
      expect(mockPush).not.toHaveBeenCalled()
    })

    it("records the artist (not the auction results page) as a recent search", async () => {
      render(<SearchBarInput searchTerm="andy" />)

      await userEvent.click(
        screen.getByRole("button", { name: "Auction Results" }),
      )

      expect(JSON.parse(localStorage.getItem("artsy.recentSearches")!)).toEqual(
        [
          {
            label: "Andy Warhol",
            href: "/artist/andy-warhol",
            item_type: "Artist",
            item_id: "andy-warhol",
          },
        ],
      )
    })
  })

  describe("recent searches", () => {
    const RECENT_SEARCHES_KEY = "artsy.recentSearches"

    it("records the suggestion with its entity page on click", async () => {
      render(<SearchBarInput searchTerm="andy" />)

      await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }))

      expect(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)!)).toEqual([
        {
          label: "Andy Warhol",
          href: "/artist/andy-warhol",
          item_type: "Artist",
          item_id: "andy-warhol",
        },
      ])
    })

    it("records the raw query with the search results page on submit", async () => {
      render(<SearchBarInput searchTerm="andy" />)

      await userEvent.type(screen.getByRole("textbox"), "{Enter}")

      expect(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)!)).toEqual([
        { label: "andy", href: "/search?term=andy" },
      ])
      expect(mockPush).toHaveBeenCalledWith("/search?term=andy")
    })
  })

  it("does not show the trending panel when the feature flag is off", async () => {
    ;(useFlag as jest.Mock).mockReturnValue(false)

    render(<SearchBarInput searchTerm="" />)

    await userEvent.click(screen.getByRole("textbox"))

    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
  })

  it("does not show the trending panel until the query resolves", async () => {
    ;(useClientQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    })

    render(<SearchBarInput searchTerm="" />)

    await userEvent.click(screen.getByRole("textbox"))

    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
  })

  it("closes the trending panel on Escape", async () => {
    render(<SearchBarInput searchTerm="" />)

    await userEvent.click(screen.getByRole("textbox"))
    expect(screen.getByText("Trending Artists")).toBeInTheDocument()

    await userEvent.keyboard("{Escape}")

    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
  })

  it("tracks rail impressions once per focus session across threshold crossings", async () => {
    // Seed recents so both the recents and the trending artists rails count
    localStorage.setItem(
      "artsy.recentSearches",
      JSON.stringify([{ label: "banksy", href: "/search?term=banksy" }]),
    )

    render(<SearchBarInput searchTerm="" />)
    const input = screen.getByRole("textbox")

    const countRailViewed = () => {
      return mockTrackEvent.mock.calls.filter(([event]) => {
        return event?.action === ActionType.railViewed
      }).length
    }

    await userEvent.click(input)
    const impressionsAfterOpen = countRailViewed()
    expect(impressionsAfterOpen).toBeGreaterThan(0)

    // Crossing the search threshold unmounts and remounts the panel; the
    // impressions must not fire again within the same focus session
    await userEvent.type(input, "ab")
    await userEvent.clear(input)
    expect(screen.getByText("Trending Artists")).toBeInTheDocument()

    expect(countRailViewed()).toEqual(impressionsAfterOpen)
  })

  it("does not reopen the trending panel after a suggestion click", async () => {
    render(<SearchBarInput searchTerm="andy" />)

    // Focus the input, then pick a result; selecting resets the query, which
    // must not surface the trending panel over the destination page
    await userEvent.click(screen.getByRole("textbox"))
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }))

    expect(mockPush).toHaveBeenCalledWith("/artist/andy-warhol")
    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
  })

  it("ignores Palette's programmatic refocus right after a selection", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    const input = screen.getByRole("textbox")

    await userEvent.click(input)
    await userEvent.click(screen.getByRole("link", { name: "Andy Warhol" }))

    // Palette's AutocompleteInput re-focuses the input ~100ms after a
    // keyboard selection (resetUI); the query is empty by then, so without
    // suppression the trending panel would pop open over the artist page
    fireEvent.focus(input)

    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
  })

  it("tracks focusedOnSearchInput on focus", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    await userEvent.click(screen.getByRole("textbox"))
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action_type: ActionType.focusedOnSearchInput,
      context_module: ContextModule.topTab,
    })
  })

  it("tracks pastedIntoSearchInput on paste", async () => {
    render(<SearchBarInput searchTerm="andy" />)
    fireEvent.paste(screen.getByRole("textbox"))
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action_type: ActionType.pastedIntoSearchInput,
      context_module: ContextModule.topTab,
      query: "andy",
    })
  })

  describe("suggested filters row", () => {
    // Both flags on: the row ships behind its own flag, and the surrounding
    // suite runs with the trending panel enabled
    const enableSuggestedFilters = () => {
      ;(useFlag as jest.Mock).mockImplementation((flag: string) => {
        return (
          flag === "onyx_trending-searches" || flag === "onyx_suggested-filters"
        )
      })
    }

    const row = () => screen.queryByTestId("suggestedFiltersRow")

    it("does not render when the feature flag is off", () => {
      // beforeEach leaves onyx_suggested-filters off
      render(<SearchBarInput searchTerm="warhol prints under 5000" />)

      expect(row()).not.toBeInTheDocument()
    })

    it("does not parse the query at all when the feature flag is off", () => {
      // While this is a partial rollout, users who can't see the row shouldn't
      // pay to parse every debounced keystroke
      render(<SearchBarInput searchTerm="warhol prints under 5000" />)

      expect(parseFilterQuery).not.toHaveBeenCalled()
    })

    it("parses the query when the feature flag is on", () => {
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm="warhol prints under 5000" />)

      expect(parseFilterQuery).toHaveBeenCalledWith("warhol prints under 5000")
    })

    it("renders the parsed filters and links to the collect page", () => {
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm="warhol prints under 5000" />)

      // toHaveTextContent flattens the <Highlight> wrappers around matched terms
      expect(row()).toHaveTextContent("warhol")
      expect(row()).toHaveTextContent("in Prints · Under $5,000")

      const href = row()?.getAttribute("href")
      expect(href).toContain("/collect/prints")
      expect(href).toContain("keyword=warhol")
    })

    it("highlights every term the user typed, including inside derived labels", () => {
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm="warhol prints under 5000" />)

      const highlighted = row()?.querySelectorAll("strong")
      const texts = Array.from(highlighted ?? []).map(node => node.textContent)

      // "prints" lights up the Prints label; "under" and "5000" light up the
      // formatted price label, since those are the words that were typed
      expect(texts).toEqual(["warhol", "Prints", "Under", "$5,000"])
    })

    it("leaves terms the user did not type unhighlighted", () => {
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm="banksy prints" />)

      const highlighted = row()?.querySelectorAll("strong")
      const texts = Array.from(highlighted ?? []).map(node => node.textContent)

      expect(texts).toEqual(["banksy", "Prints"])
    })

    it("makes the filters the headline when the query leaves no keyword", () => {
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm="prints between 1k and 5k" />)

      // No "in" line: there is no free text for the filters to qualify
      expect(row()).toHaveTextContent("Prints · $1,000–$5,000")
      expect(row()).not.toHaveTextContent("in ")
    })

    it("does not promote a filter into the keyword slot", () => {
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm="unique prints under 10000" />)

      // Previously rendered as keyword "Prints" filtered "in Under $10,000"
      expect(row()).toHaveTextContent("Prints · Unique · Under $10,000")
      expect(row()).not.toHaveTextContent("in Unique")
    })

    it.each([
      ["no prints", "negated intent"],
      ["warhol 1962-1964", "a date range, not a price"],
      ["prints and photography", "two mediums"],
      ["design miami", "a medium word inside a fair name"],
      ["paintings under £5000", "non-USD"],
      ["warhol", "a bare entity name"],
    ])("does not render for %p — %s", query => {
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm={query} />)

      expect(row()).not.toBeInTheDocument()
    })

    it("does not emit selectedItemFromSearch on click", async () => {
      // Tracking for this row lands in a follow-up PR. Until then it must not
      // masquerade as an entity in the existing event.
      enableSuggestedFilters()
      render(<SearchBarInput searchTerm="warhol prints under 5000" />)

      await userEvent.click(row() as HTMLElement)

      expect(mockTrackEvent).not.toHaveBeenCalledWith(
        expect.objectContaining({
          action: ActionType.selectedItemFromSearch,
          item_type: "filter-suggestion",
        }),
      )
    })
  })
})
