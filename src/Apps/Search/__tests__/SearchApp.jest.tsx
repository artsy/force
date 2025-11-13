import { SearchAppFragmentContainer as SearchApp } from "Apps/Search/SearchApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { screen } from "@testing-library/react"
import type { SearchAppTestQuery } from "__generated__/SearchAppTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: { term: "andy" },
      },
    },
  }),
  useIsRouteActive: () => false,
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

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
