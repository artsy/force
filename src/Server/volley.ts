import { PageOwnerType } from "@artsy/cohesion"
import { compact } from "lodash"
import { getENV } from "Utils/getENV"
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
  [metricName: string]: () => Promise<number | null> | number | null
}

const DEFAULT_METRICS: MetricMap = {
  "dom-complete": getDomComplete,
  "dom-content-loaded-start": getDomContentLoadedStart,
  "dom-content-loaded-end": getDomContentLoadedEnd,
  "load-event-end": getLoadEventEnd,
  "first-paint": getFirstPaint,
  "first-contentful-paint": getFirstContentfulPaint,
  "time-to-interactive": getTTI,
}

export async function reportLoadTimeToVolley({
  pageType,
  deviceType,
  metricsMap = DEFAULT_METRICS,
}: {
  pageType: PageOwnerType
  deviceType: string
  metricsMap?: MetricMap
}) {
  const metrics = compact(
    await Promise.all(
      Object.keys(metricsMap).map(async name => {
        const duration = await metricsMap[name]()

        if (!duration) {
          return null
        }

        const metric: VolleyMetric = {
          type: "timing",
          name: "load-time",
          timing: duration,
          tags: [
            `page-type:${pageType}`,
            `device-type:${deviceType}`,
            `mark:${name}`,
          ],
        }

        return metric
      })
    )
  )

  sendToVolley(metrics)
}

export type VolleyMetric =
  | {
      type: "timing"
      name: string
      timing: number
      sampleRate?: number
      tags?: string[]
    }
  | {
      type: "increment"
      name: string
      sampleRate?: number
      tags?: string[]
    }
  | {
      type: "incrementBy"
      name: string
      value: number
      tags?: string[]
    }
  | {
      type: "decrement"
      name: string
      sampleRate?: number
      tags?: string[]
    }
  | {
      type: "decrementBy"
      name: string
      value: number
      tags?: string[]
    }
  | {
      type: "gauge"
      name: string
      sampleRate?: number
      value: number
      tags?: string[]
    }
  | {
      type: "histogram"
      name: string
      sampleRate?: number
      value: number
      tags?: string[]
    }
  | {
      type: "set"
      name: string
      sampleRate?: number
      value: number
      tags?: string[]
    }

export const sendToVolley = (metrics: VolleyMetric[]) => {
  if (!getENV("VOLLEY_ENDPOINT") || metrics.length === 0) {
    return
  }

  return fetch(getENV("VOLLEY_ENDPOINT"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serviceName: "force", metrics }),
  })
}
