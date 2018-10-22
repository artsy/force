import { data as sd } from "sharify"
import request from "superagent"
import {
  getDomComplete,
  getOnLoad,
  getFirstPaint,
  getFirstContentfulPaint,
  getDomContentLoadedEnd,
  getDomContentLoadedStart,
} from "./user-performance-metrics"

const metricPayload = (pageType, deviceType) => (name, duration) =>
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

export async function reportLoadTimeToVolley(pageType, deviceType) {
  if (sd.VOLLEY_ENDPOINT) {
    const reportMetric = metricPayload(pageType, deviceType)
    const metrics = [
      reportMetric("dom-complete", getDomComplete()),
      reportMetric("dom-content-loaded-start", getDomContentLoadedStart()),
      reportMetric("dom-content-loaded-end", getDomContentLoadedEnd()),
      reportMetric("load-event-end", getOnLoad()),
      reportMetric("first-paint", getFirstPaint()),
      reportMetric("first-contentful-paint", getFirstContentfulPaint()),
    ].filter(metric => metric != null)
    if (metrics.length > 0) {
      return await request.post(sd.VOLLEY_ENDPOINT).send({
        serviceName: "force",
        metrics,
      })
    }
  }
}
