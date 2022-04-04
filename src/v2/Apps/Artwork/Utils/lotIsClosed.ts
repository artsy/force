export const lotIsClosed = (sale, saleArtwork): boolean => {
  return (
    !sale ||
    !saleArtwork ||
    sale?.is_closed ||
    sale?.isClosed ||
    !!saleArtwork?.endedAt
  )
}
