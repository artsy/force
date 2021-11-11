import { data as sd } from "sharify"

const SEGMENT_MAPPING = "C0001" // Segment itself assigned OneTrust Strictly Necessary category.
const SEGMENT_WRITE_KEY = sd.SEGMENT_WRITE_KEY

let PREVIOUS_CONSENT = ""
let SEGMENT_DESTINATIONS = []

export function fetchSegmentDestinationsAndLoad() {
  fetchDestinations(SEGMENT_WRITE_KEY).then(async destinations => {
    SEGMENT_DESTINATIONS = destinations

    await getConsentAndLoadSegment()

    // OneTrust calls OptanonWrapper when there's a consent change.
    window.OptanonWrapper = getConsentAndLoadSegment
  })
}

async function getConsentAndLoadSegment() {
  const consent = await getConsent()

  if (consent === PREVIOUS_CONSENT) {
    // consent didn't change, nothing to do.
    return
  }

  PREVIOUS_CONSENT = consent

  const destinationPreferences = setSegmentDestinationPref(
    consent,
    SEGMENT_DESTINATIONS
  )

  conditionallyLoadAnalytics({
    writeKey: SEGMENT_WRITE_KEY,
    destinations: SEGMENT_DESTINATIONS,
    destinationPreferences,
  })
}

async function getConsent() {
  const oneTrustConsent = await getOneTrustConsent()

  if (oneTrustConsent === "") {
    // failed getting OneTrust consent, return C0001 as we have implicit consent for Strictly Necessary things.
    return "C0001"
  } else {
    return oneTrustConsent
  }
}

async function getOneTrustConsent() {
  let attempts = 0
  const maxAttempts = 100

  // if OneTrust is not ready, wait 1 second at most.
  while (!oneTrustReady() && attempts <= maxAttempts) {
    await delay(10)
    attempts++
  }

  if (oneTrustReady()) {
    return window.OnetrustActiveGroups
  } else {
    return ""
  }
}

function oneTrustReady() {
  // OneTrust is ready when window.OnetrustActiveGroups contains at least C0001.
  if (
    typeof window.OnetrustActiveGroups === "string" &&
    window.OnetrustActiveGroups.split(",").includes("C0001")
  ) {
    return true
  }
  return false
}

function delay(n) {
  return new Promise<void>(done => {
    setTimeout(() => {
      done()
    }, n)
  })
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

function setSegmentDestinationPref(consent, destinations) {
  // map Segment destination category to OneTrust cookie category.
  const segmentToOneTrust = {
    "SMS & Push Notifications": "C0001", // OneTrust Strictly Necessary
    Analytics: "C0002", // OneTrust Performance
    Advertising: "C0004", // OneTrust Targeting
  }

  const consentArray = consent.split(",")

  const destinationPreferences = destinations
    .map(function (dest) {
      if (
        dest.category in segmentToOneTrust &&
        consentArray.includes(segmentToOneTrust[dest.category])
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
      { "Segment.io": consentArray.some(d => d === SEGMENT_MAPPING) }
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
