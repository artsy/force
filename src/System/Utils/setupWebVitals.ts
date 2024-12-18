import { getENV } from "Utils/getENV"
import { onLCP, onFCP, onTTFB, onINP, Metric } from "web-vitals"

export const setupWebVitals = () => {
  if (!getENV("ENABLE_WEB_VITALS_LOGGING")) {
    return
  }

  const VITALS = [
    ["LCP", onLCP],
    ["TTFB", onTTFB],
    ["FCP", onFCP],
    ["INP", onINP],
  ] as const

  const log = ([type, onVital]: (typeof VITALS)[0]) => {
    onVital(
      (metric: Metric) => {
        console.log(`[web-vitals] ${type}`, metric)
      },
      { reportAllChanges: true }
    )
  }

  VITALS.forEach(log)
}
