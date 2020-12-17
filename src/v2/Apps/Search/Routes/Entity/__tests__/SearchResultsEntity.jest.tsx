import { ZeroState } from "v2/Apps/Search/Components/ZeroState"
import { SystemContextProvider } from "v2/Artsy"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { MockBoot } from "v2/DevTools"
import { mount } from "enzyme"
import React from "react"
import { SearchResultsEntityRoute as SearchResultsEntity } from "../SearchResultsEntity"

describe("SearchResultsEntity", () => {
  const getWrapper = searchProps => {
    return mount(
      <MockBoot>
        <SystemContextProvider>
          <SearchResultsEntity {...searchProps} />
        </SystemContextProvider>
      </MockBoot>
    )
  }

  const props = {
    entities: ["GALLERY"],
    match: { location: { query: { term: "andy" } } },
    urlTab: "galleries",
    viewer: {
      searchConnection: {
        edges: [
          {
            node: {
              displayLabel: "Cat",
              displayType: "Artistic Cats",
              href: "/cat/percy",
              id: "percy",
            },
          },
        ],
        pageCursors: {
          around: [],
        },
        pageInfo: {
          endCursor: null,
          hasNextPage: true,
        },
      },
    },
  }

  const emptyResults = {
    entities: ["GALLERY"],
    match: { location: { query: { term: "andy" } } },
    urlTab: "galleries",
    viewer: {
      searchConnection: {
        edges: [],
        pageCursors: {
          around: [],
        },
        pageInfo: {
          endCursor: null,
          hasNextPage: true,
        },
      },
    },
  }

  it("renders the items", () => {
    const wrapper = getWrapper(props) as any
    const html = wrapper.html()
    expect(html).toContain("Artistic Cats")
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
