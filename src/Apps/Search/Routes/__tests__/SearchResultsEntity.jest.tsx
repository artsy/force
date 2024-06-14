import { ZeroState } from "Apps/Search/Components/ZeroState"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import { SearchResultsEntityRoute as SearchResultsEntity } from "Apps/Search/Routes/SearchResultsEntity"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
      },
    },
  }),
}))

describe("SearchResultsEntity", () => {
  const getWrapper = searchProps => {
    return mount(
      <MockBoot>
        <SearchResultsEntity {...searchProps} />
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
              internalID: "percy",
              displayLabel: "Cat",
              href: "/cat/percy",
              displayType: "Artistic Cats",
            },
          },
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: null,
        },
        pageCursors: {
          around: [],
        },
      },
    },
    entities: ["GALLERY"],
    urlTab: "galleries",
  }

  const emptyResults = {
    match: { location: { query: { term: "andy" } } },
    viewer: {
      searchConnection: {
        edges: [],
        pageInfo: {
          hasNextPage: true,
          endCursor: null,
        },
        pageCursors: {
          around: [],
        },
      },
    },
    entities: ["GALLERY"],
    urlTab: "galleries",
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
