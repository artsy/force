import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { screen } from "@testing-library/react"
import { SearchAppFragmentContainer as SearchApp } from "Apps/Search/SearchApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import type { SearchAppTestQuery } from "__generated__/SearchAppTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
let mockLocationQuery: { term?: string } = { term: "andy" }
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: mockLocationQuery,
      },
    },
  }),
  useIsRouteActive: () => false,
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

const mockTrackEvent = jest.fn()

beforeEach(() => {
  mockLocationQuery = { term: "andy" }
  ;(useTracking as jest.Mock).mockReturnValue({ trackEvent: mockTrackEvent })
})

afterEach(() => {
  jest.clearAllMocks()
})

const { renderWithRelay } = setupTestWrapperTL<SearchAppTestQuery>({
  Component: props => {
    return (
      <MockBoot breakpoint="lg">
        <SystemContextProvider>
          <SearchApp viewer={props.viewer!} />
        </SystemContextProvider>
      </MockBoot>
    )
  },
  query: graphql`
    query SearchAppTestQuery @relay_test_operation {
      viewer {
        ...SearchApp_viewer @arguments(term: "andy")
      }
    }
  `,
})

describe("SearchApp", () => {
  it("includes the total count", () => {
    const { container } = renderWithRelay({
      Viewer: () => VIEWER_FIXTURE,
    })

    expect(screen.getByText("521 results for")).toBeInTheDocument()
    // Check for the search term in any form (since it's split across elements)
    expect(container.innerHTML).toContain("andy")
  })

  it("includes tabs w/ counts", () => {
    renderWithRelay({
      Viewer: () => VIEWER_FIXTURE,
    })

    expect(screen.getByText("Artworks")).toBeInTheDocument()
    expect(screen.getAllByText("100")).toHaveLength(2) // Appears in both artworks count and galleries count
    expect(screen.getByText("Artists")).toBeInTheDocument()
    expect(screen.getByText("320")).toBeInTheDocument()
    expect(screen.getByText("Galleries")).toBeInTheDocument()
    expect(screen.queryByText("Categories")).not.toBeInTheDocument()
  })

  it("includes the more tab", () => {
    renderWithRelay({
      Viewer: () => VIEWER_FIXTURE,
    })

    expect(screen.getByText("More")).toBeInTheDocument()
  })

  it("does not track searchedWithNoResults when there are results", async () => {
    renderWithRelay({
      Viewer: () => VIEWER_FIXTURE,
    })

    await screen.findByText("521 results for")

    expect(mockTrackEvent).not.toHaveBeenCalled()
  })

  it("shows the zero state and tracks searchedWithNoResults when there are no results", async () => {
    renderWithRelay({
      Viewer: () => NO_RESULTS_VIEWER_FIXTURE,
    })

    await screen.findByText(
      "Try checking for spelling errors or try another search term.",
    )

    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.searchedWithNoResults,
      context_module: ContextModule.searchPageResults,
      context_owner_type: OwnerType.search,
      context_owner_id: undefined,
      context_owner_slug: undefined,
      query: "andy",
    })
  })
})

const VIEWER_FIXTURE = {
  artworksConnection: {
    counts: {
      total: 100,
    },
  },
  searchConnection: {
    aggregations: [
      {
        counts: [
          { count: 100, name: "PartnerGallery" },
          { count: 320, name: "artist" },
          { count: 0, name: "gene" },
          { count: 1, name: "feature" },
        ],
        slice: "TYPE",
      },
    ],
  },
}

const NO_RESULTS_VIEWER_FIXTURE = {
  artworksConnection: {
    counts: {
      total: 0,
    },
  },
  searchConnection: {
    aggregations: [
      {
        counts: [],
        slice: "TYPE",
      },
    ],
  },
}
