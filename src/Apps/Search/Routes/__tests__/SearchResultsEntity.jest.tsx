import { render, screen } from "@testing-library/react"
import { SearchResultsEntityRoute as SearchResultsEntity } from "Apps/Search/Routes/SearchResultsEntity"
import { MockBoot } from "DevTools/MockBoot"

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
    return render(
      <MockBoot>
        <SearchResultsEntity {...searchProps} />
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
    getWrapper(props)
    expect(screen.getByText("Artistic Cats")).toBeInTheDocument()
  })

  it("renders the pagination control", () => {
    getWrapper(props)
    expect(screen.getByTestId("pagination")).toBeInTheDocument()
  })

  it("renders zero state when there are no items", () => {
    getWrapper(emptyResults)
    expect(screen.getByTestId("zero-state")).toBeInTheDocument()
  })
})
