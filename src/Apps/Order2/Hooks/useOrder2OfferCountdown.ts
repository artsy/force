import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import { DateTime } from "luxon"

interface UseOrder2OfferCountdownProps {
  // The offer expiry time (ISO string). Pass an empty string when no countdown
  // should be shown; the returned timer will report no valid remaining time.
  endTime: string
  // Partner offers run on a 3-day window, so the start time is derived as
  // endTime − 3 days. Other offers (e.g. awaiting the buyer's response) start
  // at the end time.
  isPartnerOffer: boolean
}

export const useOrder2OfferCountdown = ({
  endTime,
  isPartnerOffer,
}: UseOrder2OfferCountdownProps) => {
  const startTime =
    isPartnerOffer && endTime
      ? DateTime.fromISO(endTime).minus({ days: 3 }).toString()
      : endTime

  return useCountdownTimer({
    startTime,
    endTime,
    imminentTime: 1,
  })
}
