import { Engine } from "v2/Utils/Engine"

export const engine = new Engine({
  workflow: [
    "Welcome",
    {
      doYouWantQuestionnaire: {
        true: [
          "AsACollector",
          {
            whatDoYouLoveMost: {
              growTasteInArt: [
                "GrowTasteInArt",
                {
                  whereWouldYouLikeToDiveIn: {
                    auctionHighlights: ["AuctionHighlights"],
                    trendingArtists: ["TrendingArtists"],
                    curatedArtworks: ["CuratedArtworks"],
                  },
                },
              ],
              collectArtThatMovesMe: [
                "CollectArtThatMovesMe",
                {
                  whereWouldYouLikeToDiveIn: {
                    findNewFromArtistsICollect: ["FindNewFromArtistsICollect"],
                    trendingArtists: ["TrendingArtists"],
                    auctionHighlights: ["AuctionHighlights"],
                  },
                },
              ],
              findNextInvestment: [
                "FindNextInvestment",
                {
                  whereWouldYouLikeToDiveIn: {
                    keepTrackOfArtistCareer: ["KeepTrackOfArtistCareer"],
                    trendingArtists: ["TrendingArtists"],
                    trendingLots: ["TrendingLots"],
                  },
                },
              ],
              keepTrackOfInterests: [
                "KeepTrackOfInterests",
                {
                  whereWouldYouLikeToDiveIn: {
                    findNewFromArtistsICollect: ["FindNewFromArtistsICollect"],
                    followGalleriesILove: ["FollowGalleriesILove"],
                    createArtWishlist: ["CreateArtWishlist"],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    "Done",
  ],
  conditions: {
    doYouWantQuestionnaire: () => {
      return true
    },
    whatDoYouLoveMost: () => {
      return "growTasteInArt"
    },
    whereWouldYouLikeToDiveIn: () => {
      return "auctionHighlights"
    },
  },
})
