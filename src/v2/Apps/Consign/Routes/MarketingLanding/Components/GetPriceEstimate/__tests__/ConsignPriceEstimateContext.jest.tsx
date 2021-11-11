import { mount } from "enzyme"
import {
  PriceEstimateContextProvider,
  usePriceEstimateContext,
  tests,
} from "../ConsignPriceEstimateContext"

import { fetchQuery } from "react-relay"

describe("ConsignPriceEstimateContext", () => {
  it("wraps in a context and injects context values", done => {
    const Test = () => {
      const context = usePriceEstimateContext()
      expect(Object.keys(context)).toEqual([
        "artistInsights",
        "isFetching",
        "medium",
        "mediums",
        "searchQuery",
        "selectedSuggestion",
        "suggestions",
        "fetchArtistInsights",
        "fetchSuggestions",
        "selectSuggestion",
        "setFetching",
        "setMedium",
        "setMediums",
        "setSearchQuery",
      ])
      done()
      return null
    }

    mount(
      <PriceEstimateContextProvider>
        <Test />
      </PriceEstimateContextProvider>
    )
  })

  describe("actions", () => {
    const mockFetchQuery = fetchQuery as jest.Mock
    const mockDispatch = jest.fn()
    const mockEnvironment = jest.fn() as any
    const getActions = tests.getActions

    afterEach(() => {
      jest.resetAllMocks()
    })

    it("#fetchArtistInsights", async () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const medium = "some-medium"

      mockFetchQuery.mockImplementation(() => {
        return { priceInsights: { edges: [{ node: { medium } }] } }
      })

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      await actions.fetchArtistInsights("some-id")

      expect(mockFetchQuery).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        { artistInternalID: "some-id" }
      )

      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { isFetching: true },
        type: "isFetching",
      })

      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: { mediums: [medium] },
        type: "mediums",
      })

      expect(mockDispatch).toHaveBeenNthCalledWith(3, {
        payload: { medium },
        type: "medium",
      })

      expect(mockDispatch).toHaveBeenNthCalledWith(4, {
        payload: {
          artistInsights: [
            {
              node: {
                medium,
              },
            },
          ],
        },
        type: "artistInsights",
      })

      expect(mockDispatch).toHaveBeenNthCalledWith(5, {
        payload: { isFetching: false },
        type: "isFetching",
      })
    })

    it("#fetchSuggestions", async () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const searchQuery = "some query"
      const suggestions = {
        searchConnection: {
          edges: [
            {
              someResult: true,
            },
          ],
        },
      }

      mockFetchQuery.mockImplementation(() => {
        return suggestions
      })

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      await actions.fetchSuggestions(searchQuery)

      expect(mockFetchQuery).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        { searchQuery }
      )

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          suggestions: suggestions.searchConnection.edges,
        },
        type: "suggestions",
      })
    })

    it("#selectSuggestion", () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      actions.fetchArtistInsights = jest.fn()
      const someSuggestion: any = {
        node: {
          internalID: "foo",
        },
      }

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      actions.selectSuggestion(someSuggestion)
      expect(actions.fetchArtistInsights).toHaveBeenCalledWith(
        someSuggestion.node.internalID
      )
    })

    it("#setFetching", () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const isFetching = true
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      actions.setFetching(isFetching)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          isFetching,
        },
        type: "isFetching",
      })
    })

    it("#setMedium", async () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const medium = "some-medium"
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      actions.setMedium(medium)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { medium },
        type: "medium",
      })
    })

    it("#setMediums", async () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const mediums = ["foo", "bar", "baz"]
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      actions.setMediums(mediums)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { mediums },
        type: "mediums",
      })
    })

    it("#setSearchQuery", () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const searchQuery = "foo"
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      actions.setSearchQuery(searchQuery)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          searchQuery,
        },
        type: "searchQuery",
      })
    })
  })

  describe("reducer", () => {
    it("maps state updates correctly", () => {
      const initialState: any = { foo: { bar: { baz: "bam" } } }
      const action: any = {
        payload: { search: "search state" },
        type: "search",
      }
      expect(tests.reducer(initialState, action)).toStrictEqual({
        ...initialState,
        search: "search state",
      })
    })
  })
})
