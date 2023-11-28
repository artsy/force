interface LegacySale {
  is_closed: boolean | null | undefined
}

interface Sale {
  isClosed: boolean | null | undefined
}

interface SaleArtwork {
  endedAt: string | null | undefined
}

export const lotIsClosed = (
  sale: LegacySale | Sale | null | undefined,
  saleArtwork: SaleArtwork | null | undefined
): boolean => {
  // If there is no sale or saleArtwork, we can't determine if the lot is closed
  // so we return true to be safe.
  if (!sale || !saleArtwork) return true

  if ("is_closed" in sale && sale.is_closed) return true
  if ("isClosed" in sale && sale.isClosed) return true
  if (saleArtwork.endedAt) return true

  return false
}
