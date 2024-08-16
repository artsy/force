export const getArtworkFilterInputArgs = (user?: User) => {
  const aggregations = ["ARTIST", "MEDIUM", "TOTAL"]

  if (user) {
    aggregations.push("FOLLOWED_ARTISTS")
  }

  // Shared with saleRoutes
  return {
    aggregations,
    first: 39,
  }
}
