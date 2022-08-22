import { conditionallyLoadAnalytics } from "./conditionallyLoadAnalytics"
import { getConsent } from "./getConsent"
import { setSegmentDestinationPref } from "./setSegmentDestinationPref"

export async function getConsentAndLoad(
  destinations,
  previousConsent,
  segmentMapping,
  writeKey
) {
  const consent = await getConsent()

  if (consent === previousConsent) {
    // consent didn't change, nothing to do.

    return consent
  }

  // flag each Segment destination on or off, based on consent.
  const destinationPref = setSegmentDestinationPref(
    consent,
    destinations,
    segmentMapping
  )

  // load Segment and pass on those flags.
  conditionallyLoadAnalytics({
    destinationPref,
    writeKey: writeKey,
  })

  return consent
}
