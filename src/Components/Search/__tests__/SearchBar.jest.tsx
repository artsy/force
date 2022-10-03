import { SearchBarTestQuery$rawResponse } from "__generated__/SearchBarTestQuery.graphql"
import { Input } from "@artsy/palette"
import {
  SearchBarRefetchContainer,
  getSearchTerm,
} from "Components/Search/SearchBar"
import { MockBoot } from "DevTools/MockBoot"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { flushPromiseQueue } from "DevTools"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const searchResults: SearchBarTestQuery$rawResponse["viewer"] = {
  searchConnection: {
    edges: [
      {
        node: {
          __isNode: "SearchableItem",
          __typename: "SearchableItem",
          displayLabel: "Percy Z",
          href: "/cat/percy-z",
          displayType: "Cat",
          slug: "percy-z",
          id: "opaque-searchable-item-id",
        },
      },
      {
        node: {
          displayLabel: "Banksy",
          href: "/artist/banksy",
          __typename: "Artist",
          statuses: {
            artworks: true,
            auctionLots: true,
          },
          __isNode: "Artist",
          id: "opaque-searchable-item-id2",
        },
      },
      {
        node: {
          displayLabel: "Not Banksy",
          href: "/artist/not-banksy",
          __typename: "Artist",
          statuses: {
            artworks: false,
            auctionLots: false,
          },
          __isNode: "Artist",
          id: "opaque-searchable-item-id3",
        },
      },
    ],
  },
}

const simulateTyping = (wrapper: ReactWrapper, text: string) => {
  const textArea = wrapper.find("input")
  textArea.simulate("focus")
  // @ts-ignore
  textArea.getDOMNode().value = text
  textArea.simulate("change")
}

describe("SearchBar", () => {
  let originalWindowLocation: Location
  let breakpoint

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot breakpoint={breakpoint}>
        <SearchBarRefetchContainer {...props} />
      </MockBoot>
    ),
    query: graphql`
      query SearchBarTestQuery($term: String!, $hasTerm: Boolean!)
        @raw_response_type
        @relay_test_operation {
        viewer {
          ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
        }
      }
    `,
    variables: {
      term: "perc",
      hasTerm: true,
    },
  })

  beforeEach(() => {
    breakpoint = "xl"
  })

  beforeAll(() => {
    originalWindowLocation = window.location
    // @ts-ignore
    delete window.location
    // @ts-ignore
    window.location = {
      assign: jest.fn(),
      pathname: "foo/bar",
    }
  })

  afterAll(() => {
    window.location = originalWindowLocation
  })

  it("displays search results", async () => {
    const wrapper = getWrapper({
      Viewer: () => searchResults,
    })

    simulateTyping(wrapper, "blah") // Any text of non-zero length.
    await flushPromiseQueue()

    expect(wrapper.text()).toContain("Percy Z")
    expect(wrapper.text()).toContain("Cat")
  })

  it("displays quick navigation links only for artists with artworks or auction results", async () => {
    const wrapper = getWrapper({
      Viewer: () => searchResults,
    })

    simulateTyping(wrapper, "blah") // Any text of non-zero length.
    await flushPromiseQueue()

    const quickNavigationItems = wrapper.find("QuickNavigationItem")

    expect(quickNavigationItems.length).toBe(2)
    expect(quickNavigationItems.at(0).text()).toContain("Artworks")
    expect(quickNavigationItems.at(1).text()).toContain("Auction Results")
  })

  it("navigates when clicking quick navigation items", async () => {
    const wrapper = getWrapper({
      Viewer: () => searchResults,
    })

    simulateTyping(wrapper, "blah") // Any text of non-zero length.
    await flushPromiseQueue()

    const quickNavigationItems = wrapper.find("QuickNavigationItem")

    quickNavigationItems.at(0).simulate("click")
    expect(window.location.assign).toHaveBeenCalledWith(
      "/artist/banksy/works-for-sale"
    )

    quickNavigationItems.at(1).simulate("click")
    expect(window.location.assign).toHaveBeenCalledWith(
      "/artist/banksy/auction-results"
    )
  })

  it("displays long placeholder text at sizes greater than xs", async () => {
    const wrapper = getWrapper({
      Viewer: () => searchResults,
    })
    await flushPromiseQueue()

    expect(wrapper.find(Input).props().placeholder).toBe(
      "Search by artist, gallery, style, theme, tag, etc."
    )
  })

  it("displays short placeholder text in the xs breakpoint", async () => {
    breakpoint = "xs"
    const wrapper = getWrapper({
      Viewer: () => searchResults,
    })
    await flushPromiseQueue()

    expect(wrapper.find(Input).props().placeholder).toBe("Search Artsy")
  })

  it("highlights matching parts of suggestions", async () => {
    const wrapper = getWrapper({
      Viewer: () => searchResults,
    })

    simulateTyping(wrapper, "perc") // Matching text w/ suggestion.
    await flushPromiseQueue()

    expect(wrapper.html()).toContain("<strong>Perc</strong>y Z")
  })
})

describe("getSearchTerm", () => {
  function buildLocationWithQueryString(queryString: string): Location {
    return {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      ancestorOrigins: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      host: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      hostname: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      href: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      origin: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      port: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      protocol: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      assign: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      hash: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      pathname: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      reload: undefined,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      replace: undefined,
      search: queryString,
    }
  }

  it("returns empty string if there is no term", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const location = buildLocationWithQueryString(undefined)

    const result = getSearchTerm(location)

    expect(result).toEqual("")
  })

  it("returns empty string if there is an empty term", () => {
    const location = buildLocationWithQueryString("")

    const result = getSearchTerm(location)

    expect(result).toEqual("")
  })

  it("returns the term if there is a single one", () => {
    const location = buildLocationWithQueryString("?term=monkey")

    const result = getSearchTerm(location)

    expect(result).toEqual("monkey")
  })

  it("returns the first term if there are multiple", () => {
    // This is not really a concern in real-life, but TypeScript says
    //  it can happen, so we should cover it.
    const location = buildLocationWithQueryString("?term=monkey&term=elephant")

    const result = getSearchTerm(location)

    expect(result).toEqual("monkey")
  })
})
