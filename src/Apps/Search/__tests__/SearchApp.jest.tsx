import { SystemContextProvider } from "System"
import { MockBoot } from "DevTools"
import { SearchApp_Test_Query } from "__generated__/SearchApp_Test_Query.graphql"
import { SearchAppFragmentContainer as SearchApp } from "Apps/Search/SearchApp"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Router/useRouter", () => ({
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

const { getWrapper } = setupTestWrapper<SearchApp_Test_Query>({
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
    query SearchApp_Test_Query @relay_test_operation {
      viewer {
        ...SearchApp_viewer @arguments(term: "andy")
      }
    }
  `,
})

describe("SearchApp", () => {
  it("includes the total count", () => {
    const wrapper = getWrapper({
      Viewer: () => VIEWER_FIXTURE,
    })
    const html = wrapper.find("TotalResults").text()
    expect(html).toContain("520 results for \u201Candy\u201D")
  })

  it("includes tabs w/ counts", () => {
    const wrapper = getWrapper({
      Viewer: () => VIEWER_FIXTURE,
    })
    const html = wrapper.find("NavigationTabs").text()
    expect(html).toMatch(/Artworks.*100/)
    expect(html).toMatch(/Artists.*320/)
    expect(html).toMatch(/Galleries.*100/)
    expect(html).not.toContain("Categories")
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
        ],
        slice: "TYPE",
      },
    ],
  },
}
