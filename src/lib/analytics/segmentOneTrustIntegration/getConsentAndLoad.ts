import { conditionallyLoadAnalytics } from "./conditionallyLoadAnalytics"
import { getConsent } from "./getConsent"
import { setSegmentDestinationPref } from "./setSegmentDestinationPref"

export async function getConsentAndLoad(
  destinations,
  previousConsent,
  segmentMapping,
  writeKey
) {
  console.log("getConsentAndLoad called")

  console.log(Date.now())

  console.log("destinations: ", destinations)
  console.log("previousConsent: ", previousConsent)

  const consent = await getConsent()

  console.log("consent: ", consent)

  if (consent === previousConsent) {
    // consent didn't change, nothing to do.
    console.log("no change to consent, nothing to do")
    return consent
  }

  // flag each Segment destination on or off, based on consent.
  const destinationPref = setSegmentDestinationPref(
    consent,
    destinations,
    segmentMapping
  )

  console.log("destinationPref: ", destinationPref)

  // load Segment and pass on those flags.
  conditionallyLoadAnalytics({
    destinationPref,
    writeKey: writeKey,
  })

  return consent
}
