import { ZeroState } from "Apps/Search/Components/ZeroState"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import { SearchResultsArtistsRoute as SearchResultsArtists } from "Apps/Search/Routes/SearchResultsArtists"

jest.mock("Components/Pagination/useComputeHref")

describe("SearchResultsArtworks", () => {
  const getWrapper = (searchProps: any) => {
    return mount(
      <MockBoot>
        <SystemContextProvider>
          <SearchResultsArtists {...searchProps} />
        </SystemContextProvider>
      </MockBoot>
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
    const wrapper = getWrapper(props).find("GenericSearchResultItem")
    const html = wrapper.text()
    expect(html).toContain("Catty Artist")
  })

  it("renders the pagination control", () => {
    const wrapper = getWrapper(props)
    expect(wrapper.find(Pagination).exists).toBeTruthy()
  })

  it("renders zero state when there are no items", () => {
    const wrapper = getWrapper(emptyResults)
    expect(wrapper.find(ZeroState).exists).toBeTruthy()
  })
})
