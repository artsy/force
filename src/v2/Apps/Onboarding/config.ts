import { useRef, useState } from "react"
import { WorkflowEngine } from "v2/Utils/WorkflowEngine"
import { Context } from "./useOnboardingContext"

interface UseEngine {
  context: React.RefObject<Context>
  onDone(): void
}

export const useEngine = ({ context, onDone }: UseEngine) => {
  const engine = useRef(
    new WorkflowEngine({
      workflow: [
        "Welcome",
        "WhatDoYouLoveMost",
        "WhereWouldYouLikeToDiveIn",
        {
          whereWouldYouLikeToDiveIn: {
            [OPTION_A_CURATED_SELECTION_OF_ARTWORKS]: [VIEW_CURATED_ARTWORKS],
            [OPTION_ARTWORKS_FROM_TRENDING_ARTISTS]: [VIEW_TRENDING_ARTISTS],
            [OPTION_AUCTION_HIGHLIGHTS_FROM_THIS_WEEK]: [
              VIEW_AUCTION_HIGHLIGHTS,
            ],
            [OPTION_CREATE_AN_ART_WISHLIST]: [VIEW_SEARCH_ARTWORKS],
            [OPTION_CURRENTLY_TRENDING_ARTISTS]: [VIEW_TRENDING_ARTISTS],
            [OPTION_FIND_NEW_ART_FROM_ARTISTS_THAT_I_COLLECT]: [
              VIEW_SEARCH_ARTISTS,
            ],
            [OPTION_FOLLOW_ARTISTS_I_COLLECT]: [VIEW_SEARCH_ARTISTS],
            [OPTION_FOLLOW_GALLERIES_I_LOVE]: [VIEW_SEARCH_GALLERIES],
            [OPTION_KEEP_TRACK_OF_ARTIST_CAREER]: [VIEW_SEARCH_ARTISTS],
            [OPTION_POPULAR_AUCTION_LOTS]: [VIEW_TRENDING_LOTS],
          },
        },
        "Done",
      ],
      conditions: {
        whereWouldYouLikeToDiveIn: () => {
          return context.current?.answer!
        },
      },
    })
  )

  const [current, setCurrent] = useState(engine.current.current())

  const next = () => {
    if (engine.current.isEnd()) {
      onDone()
      return
    }

    setCurrent(engine.current.next())
  }

  return {
    current,
    engine: engine.current,
    next,
  }
}

export const OPTION_A_CURATED_SELECTION_OF_ARTWORKS =
  "A curated selection of artworks"
export const OPTION_ARTWORKS_FROM_TRENDING_ARTISTS =
  "Artworks from trending artists"
export const OPTION_AUCTION_HIGHLIGHTS_FROM_THIS_WEEK =
  "Auction highlights from this week"
export const OPTION_CREATE_AN_ART_WISHLIST = "Create an art wishlist"
export const OPTION_CURRENTLY_TRENDING_ARTISTS = "Currently trending artists"
export const OPTION_FIND_NEW_ART_FROM_ARTISTS_THAT_I_COLLECT =
  "Find new art from artists that I collect"
export const OPTION_FOLLOW_ARTISTS_I_COLLECT = "Follow artists I collect"
export const OPTION_FOLLOW_GALLERIES_I_LOVE = "Follow galleries I love"
export const OPTION_KEEP_TRACK_OF_ARTIST_CAREER =
  "Keep track of an artist’s career"
export const OPTION_POPULAR_AUCTION_LOTS = "Popular auction lots"
export const OPTION_GROW_MY_TASTE_IN_ART = "Growing my taste in art"
export const OPTION_KEEPING_TRACK_OF_ART_I_AM_INTERESTED_IN =
  "Keeping track of art I’m interested in"
export const OPTION_FINDING_MY_NEXT_GREAT_INVESTMENT =
  "Finding my next great investment"
export const OPTION_COLLECTING_ART_THAT_MOVES_ME =
  "Collecting art that moves me"

export const VIEW_AUCTION_HIGHLIGHTS = "AuctionHighlights"
export const VIEW_CURATED_ARTWORKS = "CuratedArtworks"
export const VIEW_SEARCH_ARTISTS = "SearchArtists"
export const VIEW_SEARCH_ARTWORKS = "SearchArtworks"
export const VIEW_SEARCH_GALLERIES = "SearchGalleries"
export const VIEW_TRENDING_ARTISTS = "TrendingArtists"
export const VIEW_TRENDING_LOTS = "TrendingLots"
