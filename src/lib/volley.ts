import { data as sd } from "sharify"
import request from "superagent"
import {
  getDomComplete,
  getLoadEventEnd,
  getFirstPaint,
  getFirstContentfulPaint,
  getDomContentLoadedEnd,
  getDomContentLoadedStart,
} from "./userPerformanceMetrics"

interface MetricMap {
  [metricName: string]: () => number | null
}

const defaultMetrics: MetricMap = {
  "dom-complete": getDomComplete,
  "dom-content-loaded-start": getDomContentLoadedStart,
  "dom-content-loaded-end": getDomContentLoadedEnd,
  "load-event-end": getLoadEventEnd,
  "first-paint": getFirstPaint,
  "first-contentful-paint": getFirstContentfulPaint,
}

export const metricPayload = (pageType, deviceType, name, duration) =>
  !duration
    ? null
    : {
        type: "timing",
        name: "load-time",
        timing: duration,
        tags: [
          `page-type:${pageType}`,
          `device-type:${deviceType}`,
          `mark:${name}`,
        ],
      }

export async function reportLoadTimeToVolley(
  pageType,
  deviceType,
  metricsMap: MetricMap = defaultMetrics
) {
  if (sd.VOLLEY_ENDPOINT) {
    const metrics = Object.keys(metricsMap)
      .map(metricName =>
        metricPayload(
          pageType,
          deviceType,
          metricName,
          metricsMap[metricName]()
        )
      )
      .filter(metric => metric != null)
    if (metrics.length > 0) {
      return request.post(sd.VOLLEY_ENDPOINT).send({
        serviceName: "force",
        metrics,
      })
    }
  }
}
