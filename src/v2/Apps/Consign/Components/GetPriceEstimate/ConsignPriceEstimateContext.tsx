import React, { useContext, useReducer } from "react"
import { createContext } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"

import { ConsignPriceEstimateContext_SearchConnection_Query } from "v2/__generated__/ConsignPriceEstimateContext_SearchConnection_Query.graphql"
import { ConsignPriceEstimateContext_ArtistInsights_Query } from "v2/__generated__/ConsignPriceEstimateContext_ArtistInsights_Query.graphql"

interface PriceEstimateContextProps {
  artistInsights?: object
  fetchSuggestions?: (searchQuery: string) => void
  searchQuery?: string
  selectSuggestion?: (suggestion: any) => void
  setSearchQuery?: (searchQuery: string) => void
  suggestions?: any[]
}

const initialState = {
  artistInsights: null,
  searchQuery: "",
  suggestions: [],
}

const PriceEstimateContext = createContext<PriceEstimateContextProps>(
  initialState
)

function getActions(dispatch, relayEnvironment) {
  const actions = {
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
    selectSuggestion: suggestion => {
      actions.fetchArtistInsights(suggestion.node.internalID)
    },

    /**
     * Fetch artist insights based on artist's internalID.
     */
    fetchArtistInsights: async artistInternalID => {
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
              annualLotsSold
              annualValueSoldCents
              artistId
              artistName
              artsyQInventory
              createdAt
              demandRank
              demandTrend
              highRangeCents
              largeHighRangeCents
              largeLowRangeCents
              largeMidRangeCents
              liquidityRank
              lowRangeCents
              medianSaleToEstimateRatio
              medium
              mediumHighRangeCents
              mediumLowRangeCents
              mediumMidRangeCents
              midRangeCents
              sellThroughRate
              smallHighRangeCents
              smallLowRangeCents
              smallMidRangeCents
              updatedAt
            }
          }
        `,
        {
          artistInternalID,
          // FIXME: Figure out how to handle this constraint
          medium: "PAINTING",
        }
      )

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

function reducer(state, action) {
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
