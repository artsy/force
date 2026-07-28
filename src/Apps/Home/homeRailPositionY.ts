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
  curatorsPicksEmerging: 6,
  editorial: 7,
  auctionLots: 8,
  featuredShows: 9,
  currentFairs: 10,
  featuredGalleries: 11,
  newWorksFromGalleriesYouFollow: 12,
  recommendedArtists: 13,
  trendingArtists: 14,
} as const

export interface HomeRailTrackingProps {
  /**
   * Cohesion `RailViewed.position_y`. Home feed should pass a value from
   * {@link HOME_RAIL_POSITION_Y}; omit in tests or non-home embeds when unused.
   */
  railPositionY?: number
}
