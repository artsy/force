import { data as sd } from "sharify"
import request from "superagent"
import {
  getDomComplete,
  getOnLoad,
  getFirstPaint,
  getFirstContentfulPaint,
} from "./user-performance-metrics"

function metricPayload(pageType, deviceType, name, duration) {
  if (!duration) return null
  return {
    type: "timing",
    name: "load-time",
    timing: duration,
    tags: [
      `page-type:${pageType}`,
      `device-type:${deviceType}`,
      `mark:${name}`,
    ],
  }
}

export async function reportLoadTimeToVolley(pageType, deviceType) {
  if (sd.VOLLEY_ENDPOINT) {
    const metrics = [
      metricPayload(pageType, deviceType, "dom-complete", getDomComplete()),
      metricPayload(pageType, deviceType, "load-event-end", getOnLoad()),
      metricPayload(pageType, deviceType, "first-paint", getFirstPaint()),
      metricPayload(
        pageType,
        deviceType,
        "first-contentful-paint",
        getFirstContentfulPaint()
      ),
    ].filter(metric => metric != null)
    if (metrics.length > 0) {
      return await request.post(sd.VOLLEY_ENDPOINT).send({
        serviceName: "force",
        metrics,
      })
    }
  }
}
