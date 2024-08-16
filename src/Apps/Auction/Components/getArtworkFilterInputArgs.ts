export const getArtworkFilterInputArgs = (user?: User) => {
  const aggregations = ["ARTIST", "MEDIUM", "TOTAL", "MATERIALS_TERMS"]

  if (user) {
    aggregations.push("FOLLOWED_ARTISTS")
  }

  // Shared with auctionRoutes
  return {
    aggregations,
    first: 39,
  }
}
