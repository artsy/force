import { getENV } from "Utils/getENV"

export const reportPerformanceMeasurement = performanceStart => {
  if (!getENV("VOLLEY_ENDPOINT")) return

  const duration = performance.now() - performanceStart
  const deviceType = getENV("IS_MOBILE") ? "mobile" : "desktop"

  const metricPayload = {
    name: "autocomplete-search-response",
    tags: [`device-type:${deviceType}`, "design:rich"],
    timing: duration,
    type: "timing",
  }

  fetch(getENV("VOLLEY_ENDPOINT"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      metrics: [metricPayload],
      serviceName: "force",
    }),
  })
}
