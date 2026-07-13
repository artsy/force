interface OfferTimestamp {
  createdAt: string | null | undefined
}

interface HasCurrentCounterofferDraftParams {
  pendingOffer?: OfferTimestamp | null
  galleryOffer?: OfferTimestamp | null
}

/**
 * Whether the order’s pending offer is the buyer’s counteroffer draft for the
 * round currently being responded to.
 *
 * A pending offer only counts as a current-round draft when it was created
 * after the gallery offer being responded to. A pending offer that predates the
 * gallery’s latest offer is a stale draft left over from an earlier round (the
 * buyer countered, then the gallery countered back), and must be ignored so we
 * don’t pre-fill the form or price the summary from an outdated amount.
 *
 * Timestamps are ISO-8601 (UTC), which compare correctly as strings.
 */
export const hasCurrentCounterofferDraft = ({
  pendingOffer,
  galleryOffer,
}: HasCurrentCounterofferDraftParams): boolean => {
  if (!pendingOffer?.createdAt) {
    return false
  }

  if (!galleryOffer?.createdAt) {
    return true
  }

  return pendingOffer.createdAt > galleryOffer.createdAt
}
