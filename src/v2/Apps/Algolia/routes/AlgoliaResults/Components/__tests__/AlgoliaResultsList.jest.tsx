import { screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import {
  AlgoliaResultsList_Test_Query,
  AlgoliaResultsList_Test_QueryRawResponse,
} from "v2/__generated__/AlgoliaResultsList_Test_Query.graphql"
import {
  AlgoliaResultsListProps,
  AlgoliaResultsListFragmentContainer,
} from "../AlgoliaResultsList"
import { SearchResults } from "react-instantsearch-core"
import { AlgoliaHit } from "v2/Apps/Algolia/types"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: {
          query: "query",
        },
      },
    },
  }),
  useIsRouteActive: () => false,
}))

const onClickMock = jest.fn()

describe("AlgoliaResultsList", () => {
  const getWrapper = (
    props?: Partial<Omit<AlgoliaResultsListProps, "algolia">>
  ) => {
    return setupTestWrapperTL<AlgoliaResultsList_Test_Query>({
      Component: ({ system }) => {
        if (system?.algolia) {
          return (
            <AlgoliaResultsListFragmentContainer
              algolia={system.algolia}
              searchState={{}}
              searchResults={SearchResultsFixture}
              searching={false}
              isSearchStalled={false}
              searchingForFacetValues={[]}
              allSearchResults={SearchResultsFixture as any}
              error={null as any}
              {...props}
            />
          )
        }

        return null
      },
      query: graphql`
        query AlgoliaResultsList_Test_Query @raw_response_type {
          system {
            algolia {
              ...AlgoliaResultsList_algolia
            }
          }
        }
      `,
    })
  }

  beforeEach(() => {
    onClickMock.mockClear()
  })

  it("should render hits", () => {
    const { renderWithRelay } = getWrapper()

    renderWithRelay({
      Algolia: () => ({
        ...AlgoliaIndicesFixture,
      }),
    })

    expect(screen.getByText("Hit Name One")).toBeInTheDocument()
    expect(screen.getByText("Hit Name Two")).toBeInTheDocument()
    expect(screen.getByText("Hit Name Three")).toBeInTheDocument()
  })

  it("should render empty message", () => {
    const { renderWithRelay } = getWrapper({
      searchResults: {
        ...SearchResultsFixture,
        nbHits: 0,
        hits: [],
      },
    })

    renderWithRelay({
      Algolia: () => ({
        ...AlgoliaIndicesFixture,
      }),
    })

    const title = `Sorry, we couldn’t find an Article for “ABC”`
    const message = "Please try searching again with a different spelling."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
  })
})

const AlgoliaIndicesFixture: NonNullable<
  AlgoliaResultsList_Test_QueryRawResponse["system"]
>["algolia"] = {
  indices: [
    {
      displayName: "Article",
      name: "article",
    },
    {
      displayName: "Artist",
      name: "artist",
    },
  ],
}

const SearchResultsFixture: SearchResults<AlgoliaHit> = {
  query: "ABC",
  hits: [
    {
      name: "Hit Name One",
      image_url: "",
      href: "/hit/one",
      objectID: "hit-object-id-one",
      slug: "hit-slug-one",
      _highlightResult: {},
    },
    {
      name: "Hit Name Two",
      image_url: "",
      href: "/hit/two",
      objectID: "hit-object-id-two",
      slug: "hit-slug-two",
      _highlightResult: {},
    },
    {
      name: "Hit Name Three",
      image_url: "",
      href: "/hit/three",
      objectID: "hit-object-id-three",
      slug: "hit-slug-three",
      _highlightResult: {},
    },
  ],
  index: "article",
  hitsPerPage: 10,
  nbHits: 3,
  page: 1,
  nbPages: 1,
  processingTimeMS: 0,
  exhaustiveNbHits: false,
  disjunctiveFacets: [],
  hierarchicalFacets: [],
  facets: [],
}
