import { data as sd } from "sharify"

const SEGMENT_MAPPING = "C0001" // assign OneTrust category to Segment itself.
const SEGMENT_WRITE_KEY = sd.SEGMENT_WRITE_KEY

let PREVIOUS_CONSENT = ""
let SEGMENT_DESTINATIONS = []
let ONETRUST_ENABLED = false

if (sd.ONETRUST_SCRIPT_ID) {
  ONETRUST_ENABLED = true
}

export function loadSegment() {
  if (ONETRUST_ENABLED) {
    // OneTrust is enabled, load Segment based on OneTrust consent.
    fetchDestinations(SEGMENT_WRITE_KEY).then(async destinations => {
      SEGMENT_DESTINATIONS = destinations

      await getConsentAndLoad()

      // OneTrust calls OptanonWrapper when there's a consent change. Hook into it.
      window.OptanonWrapper = getConsentAndLoad
    })
  } else {
    // OneTrust is disabled. Load Segment normally - load all Segment destinations.
    // @ts-ignore
    window.analytics.load(SEGMENT_WRITE_KEY)
  }
}

async function getConsentAndLoad() {
  const consent = await getConsent()

  if (consent === PREVIOUS_CONSENT) {
    // consent didn't change, nothing to do.
    return
  }

  PREVIOUS_CONSENT = consent

  // flag each Segment destination on or off, based on consent.
  const destinationPref = setSegmentDestinationPref(
    consent,
    SEGMENT_DESTINATIONS
  )

  // load Segment and pass on those flags.
  conditionallyLoadAnalytics({
    writeKey: SEGMENT_WRITE_KEY,
    destinationPref,
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
    // OneTrust stores consent in window.OnetrustActiveGroups.
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
    "Segment.io": consentArray.some(d => d === SEGMENT_MAPPING),
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

function conditionallyLoadAnalytics({
  writeKey,
  destinationPref,
  shouldReload = true,
}) {
  let isAnythingEnabled = false

  for (const destination in destinationPref) {
    const isEnabled = destinationPref[destination]
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
    window.analytics.load(writeKey, { integrations: destinationPref })
  }

  // if everything is disabled, don't load segment.
}

async function fetchDestinationForWriteKey(writeKey) {
  try {
    const res = await window.fetch(
      `https://cdn.segment.com/v1/projects/${writeKey}/integrations`
    )

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`)
    }

    const destinations = await res.json()

    if (!validateSegmentResponse(destinations)) {
      throw new Error("Segment integrations API endpoint returned invalid data")
    }

    // Rename creationName to id to abstract the weird data model
    for (const destination of destinations) {
      destination.id = destination.creationName
      delete destination.creationName
    }

    return destinations
  } catch (error) {
    console.error("Error: fetching Segment destinations resulted in: ", error)
    return []
  }
}

function validateSegmentResponse(destinations) {
  if (!Array.isArray(destinations)) {
    return false
  }

  for (const destination of destinations) {
    if (!("creationName" in destination)) {
      return false
    }

    if (typeof destination.creationName !== "string") {
      return false
    }
  }

  return true
}

export const exportForTesting = {
  conditionallyLoadAnalytics,
  delay,
  fetchDestinationForWriteKey,
  fetchDestinations,
  getConsent,
  getConsentAndLoad,
  getOneTrustConsent,
  oneTrustReady,
  setSegmentDestinationPref,
  validateSegmentResponse,
}
