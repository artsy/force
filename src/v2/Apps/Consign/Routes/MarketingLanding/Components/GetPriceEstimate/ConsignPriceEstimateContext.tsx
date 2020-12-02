import React, { Dispatch, useContext, useReducer } from "react"
import { createContext } from "react"
import { Environment, fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"

import { ConsignPriceEstimateContext_SearchConnection_Query } from "v2/__generated__/ConsignPriceEstimateContext_SearchConnection_Query.graphql"
import { ConsignPriceEstimateContext_ArtistInsightByMedium_Query } from "v2/__generated__/ConsignPriceEstimateContext_ArtistInsightByMedium_Query.graphql"
import { ConsignPriceEstimateContext_ArtistInsights_Query } from "v2/__generated__/ConsignPriceEstimateContext_ArtistInsights_Query.graphql"

interface PriceEstimateContextProps {
  artistInsight?: ArtistInsight
  fetchArtistInsightByMedium?: (
    artistInternalID: string,
    medium: string
  ) => void
  fetchArtistInsights?: (artistInternalID: string) => void
  fetchSuggestions?: (searchQuery: string) => void
  isFetching?: boolean
  mediums?: string[]
  searchQuery?: string
  selectSuggestion?: (suggestion: Suggestion) => void
  selectedSuggestion?: Suggestion
  setFetching?: (isFetching: boolean) => void
  setMediums?: (mediums: PriceEstimateContextProps["mediums"]) => void
  setSearchQuery?: (searchQuery: string) => void
  suggestions?: Suggestions
}

type ArtistInsight = ConsignPriceEstimateContext_ArtistInsights_Query["response"]["priceInsights"]["edges"][0]["node"]
type Suggestions = ConsignPriceEstimateContext_SearchConnection_Query["response"]["searchConnection"]["edges"]
export type Suggestion = Suggestions[0]

type State = Pick<
  PriceEstimateContextProps,
  | "artistInsight"
  | "isFetching"
  | "mediums"
  | "searchQuery"
  | "selectedSuggestion"
  | "suggestions"
>

type Actions = Pick<
  PriceEstimateContextProps,
  | "fetchArtistInsightByMedium"
  | "fetchArtistInsights"
  | "fetchSuggestions"
  | "selectSuggestion"
  | "setFetching"
  | "setMediums"
  | "setSearchQuery"
>

type Action = {
  type: keyof State
  payload: {
    [P in keyof State]: State[P]
  }
}

const initialState: State = {
  artistInsight: undefined,
  isFetching: false,
  mediums: [],
  searchQuery: "",
  selectedSuggestion: null,
  suggestions: null,
}

const PriceEstimateContext = createContext<PriceEstimateContextProps>(
  initialState
)

function getActions(dispatch: Dispatch<Action>, relayEnvironment: Environment) {
  const actions: Actions = {
    fetchArtistInsightByMedium: async (artistInternalID, medium) => {
      const response = await fetchQuery<
        ConsignPriceEstimateContext_ArtistInsightByMedium_Query
      >(
        relayEnvironment,
        graphql`
          query ConsignPriceEstimateContext_ArtistInsightByMedium_Query(
            $artistInternalID: ID!
            $medium: String!
          ) {
            marketPriceInsights(artistId: $artistInternalID, medium: $medium) {
              artistName
              medium
              lowRangeCents
              midRangeCents
              highRangeCents
            }
          }
        `,
        {
          artistInternalID,
          medium,
        }
      )

      const artistInsight = response.marketPriceInsights

      dispatch({
        payload: {
          artistInsight,
        },
        type: "artistInsight",
      })
    },

    /**
     * Fetch artist insights based on artist's internalID.
     */
    fetchArtistInsights: async artistInternalID => {
      actions.setFetching(true)

      const response = await fetchQuery<
        ConsignPriceEstimateContext_ArtistInsights_Query
      >(
        relayEnvironment,
        graphql`
          query ConsignPriceEstimateContext_ArtistInsights_Query(
            $artistInternalID: ID!
          ) {
            priceInsights(
              artistId: $artistInternalID
              sort: DEMAND_RANK_DESC
              first: 99
            ) {
              edges {
                node {
                  artistName
                  medium
                  lowRangeCents
                  midRangeCents
                  highRangeCents
                }
              }
            }
          }
        `,
        {
          artistInternalID,
        }
      )

      let artistInsight = null

      const edges = response?.priceInsights?.edges
      if (edges?.length) {
        artistInsight = edges[0].node
        const mediums = edges.map(({ node }) => node.medium).sort()
        actions.setMediums(mediums)
      }

      dispatch({
        payload: {
          artistInsight,
        },
        type: "artistInsight",
      })

      actions.setFetching(false)
    },

    /**
     * Fetches artist search suggestions based on searchQuery
     */
    fetchSuggestions: async searchQuery => {
      const response = await fetchQuery<
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
                    slug
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

      const suggestions = response.searchConnection.edges

      dispatch({
        payload: {
          suggestions,
        },
        type: "suggestions",
      })
    },

    /**
     * Handler for when a drop down item is selected
     */
    selectSuggestion: async selectedSuggestion => {
      dispatch({
        payload: {
          selectedSuggestion,
        },
        type: "selectedSuggestion",
      })

      await actions.fetchArtistInsights(selectedSuggestion.node.internalID)
    },

    setFetching: isFetching => {
      dispatch({
        payload: {
          isFetching,
        },
        type: "isFetching",
      })
    },

    setMediums: mediums => {
      dispatch({
        payload: {
          mediums,
        },
        type: "mediums",
      })
    },

    /**
     * Updates state with current search query
     */
    setSearchQuery: searchQuery => {
      dispatch({
        payload: {
          searchQuery,
        },
        type: "searchQuery",
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

export const tests = {
  getActions,
  reducer,
}
