import { data as sd } from "sharify"

console.log("hello world", window.analytics)

const SEGMENT_WRITE_KEY = sd.SEGMENT_WRITE_KEY
const SEGMENT_MAPPING = "C0001" // Segment itself assigned OneTrust Strictly Necessary category.
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
  // OneTrust is ready if OnetrustActiveGroups contains at least Strictly Necessary group.
  if (
    typeof window.OnetrustActiveGroups === "string" &&
    window.OnetrustActiveGroups.split(",").includes("C0001")
  ) {
    return true
  }
  return false
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
  const oneTrustConsent = window.OnetrustActiveGroups.split(",")

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
  // maps Segment destination's category to OneTrust cookie category.
  const segmentToOneTrust = {
    "SMS & Push Notifications": "C0001", // OneTrust Strictly Necessary
    Analytics: "C0002", // OneTrust Performance
    Advertising: "C0004", // OneTrust Targeting
  }

  const destinationPreferences = destinations
    .map(function (dest) {
      if (
        dest.category in segmentToOneTrust &&
        oneTrustConsent.includes(segmentToOneTrust[dest.category])
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
      { "Segment.io": oneTrustConsent.some(d => d === SEGMENT_MAPPING) }
    )

  return destinationPreferences
}

function conditionallyLoadAnalytics({
  writeKey,
  destinations,
  destinationPreferences,
}) {
  let isAnythingEnabled = false

  for (const destination in destinationPreferences) {
    const isEnabled = destinationPreferences[destination]
    if (isEnabled) {
      isAnythingEnabled = true
    }
  }

  if (isAnythingEnabled) {
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
