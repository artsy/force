export const getArtworkFilterInputArgs = (user?: User) => {
  const aggregations = ["ARTIST", "MEDIUM", "TOTAL"]

  // Shared with saleRoutes
  return {
    aggregations,
    first: 39,
  }
}
