import { createContext, useContext } from "react"

interface ArtistRecentAuctionResultsContextValue {
  hasRecentAuctionResults: boolean
}

const ArtistRecentAuctionResultsContext =
  createContext<ArtistRecentAuctionResultsContextValue>({
    hasRecentAuctionResults: false,
  })

export const ArtistRecentAuctionResultsProvider =
  ArtistRecentAuctionResultsContext.Provider

export const useArtistRecentAuctionResults =
  (): ArtistRecentAuctionResultsContextValue => {
    return useContext(ArtistRecentAuctionResultsContext)
  }
