export function setSegmentDestinationPref(
  consent,
  destinations,
  segmentMapping
) {
  // map Segment destination id to OneTrust cookie category.
  const segmentToOneTrust = {
    AdWords: "C0004",
    "Amazon S3": "C0001",
    Appboy: "C0001",
    "Facebook Pixel": "C0004",
    "Google Analytics": "C0002",
    Indicative: "C0002",
    "Segment.io": "C0001",
  }

  const consentArray = consent.split(",")

  const basePref = {
    // default to false for all Segment destinations.
    // so if we don't set preference for a destination, it will not be loaded.
    All: false,
    // whether we send events to Segment itself.
    "Segment.io": consentArray.some(d => d === segmentMapping),
  }

  // for each destination, if its id maps to a OneTrust category that is present in consent, set it true, to be enabled.
  const additionalPref = destinations
    .map(function (dest) {
      if (
        dest.id in segmentToOneTrust &&
        consentArray.includes(segmentToOneTrust[dest.id])
      ) {
        return { [dest.id]: true }
      } else {
        // no mapping for the destination, or it maps to a OneTrust category that is not present in OneTrust consent.
        return { [dest.id]: false }
      }
    })
    .reduce((acc, val) => {
      return {
        ...val,
        ...acc,
      }
    }, [])

  const destinationPref = {
    ...basePref,
    ...additionalPref,
  }

  return destinationPref
}
