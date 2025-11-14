import { SearchResultsArtistsRoute as SearchResultsArtists } from "Apps/Search/Routes/SearchResultsArtists"
import { MockBoot } from "DevTools/MockBoot"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { render, screen } from "@testing-library/react"

jest.mock("Components/Pagination/useComputeHref")

describe("SearchResultsArtworks", () => {
  const getWrapper = (searchProps: any) => {
    return render(
      <MockBoot>
        <SystemContextProvider>
          <SearchResultsArtists {...searchProps} />
        </SystemContextProvider>
      </MockBoot>,
    )
  }

  const props = {
    match: { location: { query: { term: "andy" } } },
    viewer: {
      searchConnection: {
        edges: [
          {
            node: {
              internalID: "catty-artist",
              name: "Catty Artist",
              imageUrl: "",
              href: "/artist/catty-artist",
              bio: null,
            },
          },
        ],
        pageInfo: {
          hasNextPage: true,
        },
        pageCursors: {
          around: [],
        },
      },
    },
  }

  const emptyResults = {
    match: { location: { query: { term: "andy" } } },
    viewer: {
      searchConnection: {
        edges: [],
        pageInfo: {
          hasNextPage: true,
        },
        pageCursors: {
          around: [],
        },
      },
    },
  }

  it("renders artworks contents", () => {
    getWrapper(props)
    expect(screen.getByText("Catty Artist")).toBeInTheDocument()
  })

  it("renders the pagination control", () => {
    const { container } = getWrapper(props)
    // Look for pagination-related elements
    expect(
      container.querySelector("[data-testid*='pagination']") ||
        container.querySelector("nav") ||
        container.querySelector("[role='navigation']"),
    ).toBeTruthy()
  })

  it("renders zero state when there are no items", () => {
    getWrapper(emptyResults)
    // Check for zero state text content
    expect(
      screen.getByText(/No results found/i) ||
        screen.queryByText(/Try searching for something else/i) ||
        screen.queryByText(/0 results/i),
    ).toBeTruthy()
  })
})
