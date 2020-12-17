import { ZeroState } from "v2/Apps/Search/Components/ZeroState"
import { SystemContextProvider } from "v2/Artsy"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { MockBoot } from "v2/DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchResultsArtistsRoute as SearchResultsArtists } from "../SearchResultsArtists"

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
              bio: null,
              href: "/artist/catty-artist",
              imageUrl: "",
              name: "Catty Artist",
            },
          },
        ],
        pageCursors: {
          around: [],
        },
        pageInfo: {
          hasNextPage: true,
        },
      },
    },
  }

  const emptyResults = {
    match: { location: { query: { term: "andy" } } },
    viewer: {
      searchConnection: {
        edges: [],
        pageCursors: {
          around: [],
        },
        pageInfo: {
          hasNextPage: true,
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
