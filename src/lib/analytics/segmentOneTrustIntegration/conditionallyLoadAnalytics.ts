export function conditionallyLoadAnalytics({
  destinationPref,
  shouldReload = true,
  writeKey,
}) {
  console.log("conditionallyLoadAnalytics")

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
    console.log("loading segment")
    // @ts-ignore
    window.analytics.load(writeKey, { integrations: destinationPref })
  }

  // if everything is disabled, don't load segment.
}
