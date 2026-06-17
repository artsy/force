import { DateTime } from "luxon"

interface PartnerOffer {
  endAt?: string | null
  isAvailable?: boolean | null
}

/**
 * A partner offer is "active" — still actionable by the collector — when it is
 * marked available by Gravity and its expiry timer has not run out.
 */
export const isPartnerOfferActive = (
  offer: PartnerOffer | null | undefined,
): boolean => {
  if (!offer || !offer.isAvailable || !offer.endAt) {
    return false
  }

  return DateTime.fromISO(offer.endAt) > DateTime.now()
}
