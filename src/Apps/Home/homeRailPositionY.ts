/**
 * Vertical slot index for home feed rails (Cohesion `RailViewed.position_y`).
 * Values match the static layout order in `HomeApp`, not the count of visible rails.
 */
export const HOME_RAIL_POSITION_Y = {
  hero: 1,
  featured: 2,
  myActiveBids: 3,
  worksForYou: 4,
  artworkRecommendations: 5,
  basedOnYourRecentSaves: 6,
  curatorsPicksEmerging: 7,
  editorial: 8,
  auctionLots: 9,
  featuredShows: 10,
  currentFairs: 11,
  featuredGalleries: 12,
  newWorksFromGalleriesYouFollow: 13,
  recommendedArtists: 14,
  trendingArtists: 15,
} as const

export interface HomeRailTrackingProps {
  /**
   * Cohesion `RailViewed.position_y`. Home feed should pass a value from
   * {@link HOME_RAIL_POSITION_Y}; omit in tests or non-home embeds when unused.
   */
  railPositionY?: number
}
