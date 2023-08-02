interface LegacySale {
  is_closed: boolean | null
}

interface Sale {
  isClosed: boolean | null
}

interface SaleArtwork {
  endedAt: string | null
}

export const lotIsClosed = (
  sale: LegacySale | Sale | null,
  saleArtwork: SaleArtwork | null
): boolean => {
  // If there is no sale or saleArtwork, we can't determine if the lot is closed
  // so we return true to be safe.
  if (!sale || !saleArtwork) return true

  if ("is_closed" in sale && sale.is_closed) return true
  if ("isClosed" in sale && sale.isClosed) return true
  if (saleArtwork.endedAt) return true

  return false
}
