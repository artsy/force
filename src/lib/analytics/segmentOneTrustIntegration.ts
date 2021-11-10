import { data as sd } from "sharify"

const SEGMENT_MAPPING = "C0001" // Segment itself assigned OneTrust Strictly Necessary category.
const SEGMENT_WRITE_KEY = sd.SEGMENT_WRITE_KEY

let ONETRUST_PREVIOUS_CONSENT = ""
let SEGMENT_DESTINATIONS = []

export function fetchSegmentDestinationsAndLoad() {
  fetchDestinations(SEGMENT_WRITE_KEY).then(destinations => {
    SEGMENT_DESTINATIONS = destinations

    waitForOneTrust()

    if (oneTrustReady()) {
      getConsentAndLoadSegment()
    }
  })

  // OneTrust calls OptanonWrapper when there's a consent change.
  window.OptanonWrapper = getConsentAndLoadSegment
}

function waitForOneTrust() {
  let attempts = 0
  const maxAttempts = 100

  // wait 1sec at most.
  if (!oneTrustReady()) {
    const interval = setInterval(() => {
      if (oneTrustReady() || attempts > maxAttempts) clearInterval(interval)
      attempts++
    }, 10)
  }
}

function oneTrustReady() {
  if (typeof window.Optanon === "undefined") {
    return false
  }
  return true
}

async function fetchDestinations(writeKey) {
  let destinations = await fetchDestinationForWriteKey(writeKey)

  destinations = [
    ...destinations
      .reduce((map, item) => {
        if (item.id === "Repeater") return map // remove Segment Repeater destinations
        map.has(item["id"]) || map.set(item["id"], item)
        return map
      }, new Map()) // return object
      .values(),
  ]

  return destinations
}

function getConsentAndLoadSegment() {
  // OneTrust stores consent in OnetrustActiveGroups.
  const oneTrustConsent = window.OnetrustActiveGroups

  if (oneTrustConsent === ONETRUST_PREVIOUS_CONSENT) {
    // consent didn't change, nothing to do.
    return
  }

  ONETRUST_PREVIOUS_CONSENT = oneTrustConsent

  const destinationPreferences = setSegmentDestinationPref(
    oneTrustConsent,
    SEGMENT_DESTINATIONS
  )

  conditionallyLoadAnalytics({
    writeKey: SEGMENT_WRITE_KEY,
    destinations: SEGMENT_DESTINATIONS,
    destinationPreferences,
  })
}

function setSegmentDestinationPref(oneTrustConsent, destinations) {
  // map Segment destination category to OneTrust cookie category.
  const segmentToOneTrust = {
    "SMS & Push Notifications": "C0001", // OneTrust Strictly Necessary
    Analytics: "C0002", // OneTrust Performance
    Advertising: "C0004", // OneTrust Targeting
  }

  const consent = oneTrustConsent.split(",")

  const destinationPreferences = destinations
    .map(function (dest) {
      if (
        dest.category in segmentToOneTrust &&
        consent.includes(segmentToOneTrust[dest.category])
      ) {
        return { [dest.id]: true }
      } else {
        // if we don't have a mapping for the Segment category, or we do but there's no OneTrust consent.
        return { [dest.id]: false }
      }
    })
    .reduce(
      (acc, val) => {
        return {
          ...val,
          ...acc,
        }
      },
      { "Segment.io": consent.some(d => d === SEGMENT_MAPPING) }
    )

  return destinationPreferences
}

function conditionallyLoadAnalytics({
  writeKey,
  destinations,
  destinationPreferences,
  shouldReload = true,
}) {
  let isAnythingEnabled = false

  for (const destination in destinationPreferences) {
    const isEnabled = destinationPreferences[destination]
    if (isEnabled) {
      isAnythingEnabled = true
    }
  }

  // @ts-ignore
  if (window.analytics.initialized) {
    // Segment has been initialized, a page reload is required to reload Segment.
    if (shouldReload) {
      window.location.reload()
    }
    return
  }

  if (isAnythingEnabled) {
    // @ts-ignore
    window.analytics.load(writeKey, { integrations: destinationPreferences })
  }

  // if everything is disabled, don't load segment.
}

async function fetchDestinationForWriteKey(writeKey) {
  const res = await window.fetch(
    `https://cdn.segment.com/v1/projects/${writeKey}/integrations`
  )

  if (!res.ok) {
    throw new Error(
      `Failed to fetch Segment destinations: HTTP ${res.status} ${res.statusText}`
    )
  }

  const destinations = await res.json()

  // Rename creationName to id to abstract the weird data model
  for (const destination of destinations) {
    destination.id = destination.creationName
    delete destination.creationName
  }

  return destinations
}
