import { ActionType, ContextModule } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { SearchResultsList } from "Components/Search/Mobile/SearchResultsList"
import { ARTWORKS_PILL, TOP_PILL } from "Components/Search/constants"
import type { SearchResultsList_viewer$data } from "__generated__/SearchResultsList_viewer.graphql"
import type { RelayPaginationProp } from "react-relay"
import { useTracking } from "react-tracking"

jest.mock("@unleash/proxy-client-react", () => ({ useFlag: jest.fn() }))
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => {
    return { router: { push: jest.fn() }, match: { location: {} } }
  },
}))

const mockTrackEvent = jest.fn()
const mockOnClose = jest.fn()

const QUERY = "warhol prints under 5000"

const relay = {
  hasMore: () => false,
  isLoading: () => false,
  loadMore: jest.fn(),
} as unknown as RelayPaginationProp

const viewerWithNoResults = {
  searchConnection: { edges: [] },
} as unknown as SearchResultsList_viewer$data

// The default: the row has to sit above real entity results, not only in the
// empty state
const viewerWithResults = {
  searchConnection: {
    edges: [
      {
        highlights: null,
        node: {
          __typename: "SearchableItem",
          displayLabel: "Andy Warhol",
          displayType: "Artist",
          href: "/artist/andy-warhol",
          imageUrl: "",
          internalID: "andy-warhol-id",
          slug: "andy-warhol",
        },
      },
    ],
  },
} as unknown as SearchResultsList_viewer$data

const renderList = ({
  query = QUERY,
  selectedPill = TOP_PILL,
  viewer = viewerWithResults,
} = {}) => {
  return render(
    <SearchResultsList
      relay={relay}
      viewer={viewer}
      query={query}
      debouncedQuery={query}
      selectedPill={selectedPill}
      onClose={mockOnClose}
    />,
  )
}

const row = () => {
  return screen.queryByTestId("suggestedFiltersRow")
}

describe("SearchResultsList", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent: mockTrackEvent }
    })
    ;(useFlag as jest.Mock).mockImplementation(() => true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("suggested filters row", () => {
    it("links to the term page with the parsed filters", () => {
      renderList()

      // First of several links: prepended above the entity results
      const links = screen.getAllByRole("link")
      expect(links.length).toBeGreaterThan(1)
      expect(links[0]).toHaveAttribute("data-testid", "suggestedFiltersRow")

      expect(row()).toHaveTextContent("warhol")
      expect(row()).toHaveTextContent("in Prints · Under $5,000")

      const href = row()?.getAttribute("href")
      expect(href).toContain("/search?")
      expect(href).toContain("term=warhol&")
      expect(href).toContain("additional_gene_ids%5B0%5D=prints")
    })

    it("is hidden when the feature flag is off", () => {
      ;(useFlag as jest.Mock).mockImplementation(() => false)
      renderList()

      expect(row()).not.toBeInTheDocument()
    })

    it("is hidden when the query parses to no filters", () => {
      renderList({ query: "warhol" })

      expect(row()).not.toBeInTheDocument()
    })

    it("is hidden on the entity pills, which scope to a single type", () => {
      renderList({ selectedPill: ARTWORKS_PILL })

      expect(row()).not.toBeInTheDocument()
    })

    it("still shows when nothing else matched", () => {
      // With no entity result, the filters are the only answer left
      renderList({ viewer: viewerWithNoResults })

      expect(screen.getByText(/we couldn’t find anything/)).toBeInTheDocument()
      expect(row()).toBeInTheDocument()
    })

    it("tracks its impression once", () => {
      const { rerender } = renderList()

      rerender(
        <SearchResultsList
          relay={relay}
          viewer={viewerWithResults}
          query={QUERY}
          debouncedQuery={QUERY}
          selectedPill={TOP_PILL}
          onClose={mockOnClose}
        />,
      )

      const impressions = mockTrackEvent.mock.calls.filter(([event]) => {
        return event.action === ActionType.searchedWithSuggestedFilter
      })

      expect(impressions).toHaveLength(1)
      expect(impressions[0][0]).toMatchObject({
        context_module: ContextModule.suggestedFilters,
        query: QUERY,
      })
      expect(JSON.parse(impressions[0][0].filters)).toMatchObject({
        medium: "prints",
      })
    })

    it("tracks the click with its filters, and closes the overlay", () => {
      renderList()
      row()?.click()

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: ActionType.selectedSuggestedFilter,
          context_module: ContextModule.suggestedFilters,
          query: QUERY,
        }),
      )
      expect(mockOnClose).toHaveBeenCalled()
    })
  })
})
