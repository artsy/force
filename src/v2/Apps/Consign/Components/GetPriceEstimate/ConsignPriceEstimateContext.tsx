import React, { Dispatch, useContext, useReducer } from "react"
import { createContext } from "react"
import { Environment, fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"

import { ConsignPriceEstimateContext_SearchConnection_Query } from "v2/__generated__/ConsignPriceEstimateContext_SearchConnection_Query.graphql"
import { ConsignPriceEstimateContext_ArtistInsights_Query } from "v2/__generated__/ConsignPriceEstimateContext_ArtistInsights_Query.graphql"

interface PriceEstimateContextProps {
  artistInsights?: ArtistInsights
  fetchArtistInsights?: (artistInternalID: string) => void
  fetchSuggestions?: (searchQuery: string) => void
  isFetching?: boolean
  searchQuery?: string
  selectSuggestion?: (suggestion: Suggestion) => void
  selectedSuggestion?: Suggestion
  setFetching?: (isFetching: boolean) => void
  setSearchQuery?: (searchQuery: string) => void
  suggestions?: Suggestions
}

type ArtistInsights = ConsignPriceEstimateContext_ArtistInsights_Query["response"]
type Suggestions = ConsignPriceEstimateContext_SearchConnection_Query["response"]["searchConnection"]["edges"]
type Suggestion = Suggestions[0]

type State = Pick<
  PriceEstimateContextProps,
  | "artistInsights"
  | "isFetching"
  | "searchQuery"
  | "selectedSuggestion"
  | "suggestions"
>

type Actions = Pick<
  PriceEstimateContextProps,
  | "fetchArtistInsights"
  | "fetchSuggestions"
  | "selectSuggestion"
  | "setFetching"
  | "setSearchQuery"
>

type Action = {
  type: keyof State
  payload: {
    [P in keyof State]: State[P]
  }
}

const initialState: State = {
  artistInsights: null,
  isFetching: false,
  searchQuery: "",
  selectedSuggestion: null,
  suggestions: null,
}

const PriceEstimateContext = createContext<PriceEstimateContextProps>(
  initialState
)

function getActions(dispatch: Dispatch<Action>, relayEnvironment: Environment) {
  const actions: Actions = {
    setFetching: isFetching => {
      dispatch({
        type: "isFetching",
        payload: {
          isFetching,
        },
      })
    },

    /**
     * Updates state with current search query
     */
    setSearchQuery: searchQuery => {
      dispatch({
        type: "searchQuery",
        payload: {
          searchQuery,
        },
      })
    },

    /**
     * Fetches artist search suggestions based on searchQuery
     */
    fetchSuggestions: async searchQuery => {
      const suggestions = await fetchQuery<
        ConsignPriceEstimateContext_SearchConnection_Query
      >(
        relayEnvironment,
        graphql`
          query ConsignPriceEstimateContext_SearchConnection_Query(
            $searchQuery: String!
          ) {
            searchConnection(
              query: $searchQuery
              entities: ARTIST
              mode: AUTOSUGGEST
              first: 7
            ) {
              edges {
                node {
                  displayLabel
                  ... on Artist {
                    internalID
                    imageUrl
                  }
                }
              }
            }
          }
        `,
        { searchQuery }
      )

      dispatch({
        type: "suggestions",
        payload: {
          suggestions: suggestions.searchConnection.edges,
        },
      })
    },

    /**
     * Handler for when a drop down item is selected
     */
    selectSuggestion: async selectedSuggestion => {
      await actions.fetchArtistInsights(selectedSuggestion.node.internalID)

      dispatch({
        type: "selectedSuggestion",
        payload: {
          selectedSuggestion,
        },
      })
    },

    /**
     * Fetch artist insights based on artist's internalID.
     */
    fetchArtistInsights: async artistInternalID => {
      actions.setFetching(true)

      const artistInsights = await fetchQuery<
        ConsignPriceEstimateContext_ArtistInsights_Query
      >(
        relayEnvironment,
        graphql`
          query ConsignPriceEstimateContext_ArtistInsights_Query(
            $artistInternalID: ID!
            $medium: String!
          ) {
            marketPriceInsights(artistId: $artistInternalID, medium: $medium) {
              artistName
              lowRangeCents
              midRangeCents
              highRangeCents
            }
          }
        `,
        {
          artistInternalID,
          // FIXME: Figure out how to handle this constraint
          medium: "PAINTING",
        }
      )

      actions.setFetching(false)

      dispatch({
        type: "artistInsights",
        payload: {
          artistInsights,
        },
      })
    },
  }

  return actions
}

function reducer(state: State, action: Action): State {
  return {
    ...state,
    [action.type]: action.payload[action.type],
  }
}

export const PriceEstimateContextProvider: React.FC = ({ children }) => {
  const { relayEnvironment } = useSystemContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = getActions(dispatch, relayEnvironment)
  const values = {
    ...state,
    ...actions,
  }

  return (
    <PriceEstimateContext.Provider value={values}>
      {children}
    </PriceEstimateContext.Provider>
  )
}

export const usePriceEstimateContext = () => {
  const context = useContext(PriceEstimateContext)
  return context
}
