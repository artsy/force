import React from "react"
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
        "artistInsight",
        "isFetching",
        "mediums",
        "searchQuery",
        "selectedSuggestion",
        "suggestions",
        "fetchArtistInsightByMedium",
        "fetchArtistInsights",
        "fetchSuggestions",
        "selectSuggestion",
        "setFetching",
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

    it("#fetchArtistInsightByMedium", async () => {
      const actions = getActions(mockDispatch, mockEnvironment)

      mockFetchQuery.mockImplementation(() => {
        return { marketPriceInsights: "foo" }
      })

      await actions.fetchArtistInsightByMedium("some-id", "some-medium")

      expect(mockFetchQuery).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        { artistInternalID: "some-id", medium: "some-medium" }
      )

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          artistInsight: "foo",
        },
        type: "artistInsight",
      })
    })

    it("#fetchArtistInsights", async () => {
      const actions = getActions(mockDispatch, mockEnvironment)

      mockFetchQuery.mockImplementation(() => {
        return { priceInsights: { edges: [{ node: { medium: "bar" } }] } }
      })

      await actions.fetchArtistInsights("some-id")

      expect(mockFetchQuery).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        { artistInternalID: "some-id" }
      )

      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          isFetching: true,
        },
        type: "isFetching",
      })

      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: {
          mediums: ["bar"],
        },
        type: "mediums",
      })

      expect(mockDispatch).toHaveBeenNthCalledWith(3, {
        payload: {
          artistInsight: {
            medium: "bar",
          },
        },
        type: "artistInsight",
      })

      expect(mockDispatch).toHaveBeenNthCalledWith(4, {
        payload: {
          isFetching: false,
        },
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

      actions.selectSuggestion(someSuggestion)
      expect(actions.fetchArtistInsights).toHaveBeenCalledWith(
        someSuggestion.node.internalID
      )
    })

    it("#setFetching", () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const isFetching = true
      actions.setFetching(isFetching)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          isFetching,
        },
        type: "isFetching",
      })
    })

    it("#setSearchQuery", () => {
      const actions = getActions(mockDispatch, mockEnvironment)
      const searchQuery = "foo"
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
