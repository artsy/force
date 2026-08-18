import { ActionType, ContextModule } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useRouter } from "System/Hooks/useRouter"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useTracking } from "react-tracking"
import { SearchBarInput } from "../SearchBarInput"

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

describe("SearchBarInput", () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      match: { location: { pathname: "/search" } },
      router: { push: mockPush },
    })
    ;(useTracking as jest.Mock).mockReturnValue({ trackEvent: mockTrackEvent })
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
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
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

  it("closes the trending panel on Escape", async () => {
    render(<SearchBarInput searchTerm="" />)

    await userEvent.click(screen.getByRole("textbox"))
    expect(screen.getByText("Trending Artists")).toBeInTheDocument()

    await userEvent.keyboard("{Escape}")

    expect(screen.queryByText("Trending Artists")).not.toBeInTheDocument()
  })

  it("tracks rail impressions once per focus session across threshold crossings", async () => {
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
})
