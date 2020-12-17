import { data as sd } from "sharify"
import request from "superagent"
import {
  getDomComplete,
  getDomContentLoadedEnd,
  getDomContentLoadedStart,
  getFirstContentfulPaint,
  getFirstPaint,
  getLoadEventEnd,
  getTTI,
} from "./userPerformanceMetrics"

interface MetricMap {
  [metricName: string]: () => Promise<number> | number | null
}

const defaultMetrics: MetricMap = {
  "dom-complete": getDomComplete,
  "dom-content-loaded-end": getDomContentLoadedEnd,
  "dom-content-loaded-start": getDomContentLoadedStart,
  "first-contentful-paint": getFirstContentfulPaint,
  "first-paint": getFirstPaint,
  "load-event-end": getLoadEventEnd,
  "time-to-interactive": getTTI,
}

export const metricPayload = (pageType, deviceType, name, duration) => {
  return !duration
    ? null
    : {
        name: "load-time",
        tags: [
          `page-type:${pageType}`,
          `device-type:${deviceType}`,
          `mark:${name}`,
        ],
        timing: duration,
        type: "timing",
      }
}

export async function reportLoadTimeToVolley(
  pageType,
  deviceType,
  metricsMap: MetricMap = defaultMetrics
) {
  if (sd.VOLLEY_ENDPOINT) {
    const metrics = (
      await Promise.all(
        Object.keys(metricsMap).map(async metricName =>
          metricPayload(
            pageType,
            deviceType,
            metricName,
            await metricsMap[metricName]()
          )
        )
      )
    ).filter(metric => metric != null)
    if (metrics.length > 0) {
      return request.post(sd.VOLLEY_ENDPOINT).send({
        metrics,
        serviceName: "force",
      })
    }
  }
}
