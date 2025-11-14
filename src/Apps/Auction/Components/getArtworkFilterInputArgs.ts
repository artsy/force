export const getArtworkFilterInputArgs = (_user?: User) => {
  const aggregations = ["ARTIST", "MEDIUM", "TOTAL", "MATERIALS_TERMS"]

  // Shared with auctionRoutes
  return {
    aggregations,
    first: 40,
  }
}
