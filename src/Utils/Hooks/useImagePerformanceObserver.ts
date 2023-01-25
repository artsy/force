import { useEffect, useRef } from "react"
import { sendToVolley, VolleyMetric } from "Server/volley"
import { getENV } from "Utils/getENV"
import { getImageService } from "Utils/resizer"

const DEVICE_TYPE = getENV("IS_MOBILE") ? "mobile" : "desktop"

type Entry = Pick<
  PerformanceResourceTiming,
  "initiatorType" | "transferSize" | "name" | "duration"
>

const TRACKING_URL_ALLOWLIST = [
  getENV("GEMINI_CLOUDFRONT_URL"),
  getENV("LAMBDA_IMAGE_RESIZING_URL"),
  getENV("IMGIX_URL"),
].filter(Boolean)

export const useImagePerformanceObserver = () => {
  const queue = useRef<{ entry: Entry; rootPath: string }[]>([])

  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return

    let performanceObserver: PerformanceObserver | null = null

    try {
      performanceObserver = new PerformanceObserver(observedEntries => {
        const entries = observedEntries.getEntries()

        entries.forEach((entry: PerformanceResourceTiming) => {
          if (
            // Only log images
            entry.initiatorType !== "img" ||
            // Ensure they are uncached
            entry.transferSize === 0 ||
            // Ensure they come from image domains we want to track
            !TRACKING_URL_ALLOWLIST.some(url => entry.name.includes(url)) ||
            // Ensure they have transfer size supported
            !entry.transferSize
          ) {
            return
          }

          const rootPath = window.location.pathname.split("/")[1]

          queue.current.push({ entry, rootPath })
        })
      })

      performanceObserver.observe({
        type: "resource",
        buffered: true,
      })
    } catch (error) {
      console.error(error)
    }

    return () => {
      performanceObserver && performanceObserver.disconnect()
    }
  }, [])

  // Every 5 seconds, send the queue to the server
  useEffect(() => {
    const interval = setInterval(() => {
      const entries = queue.current

      if (entries.length === 0) return

      const data = entries.map(({ entry, rootPath }) => {
        const payload: VolleyMetric = {
          type: "timing",
          name: "image.load-time",
          timing: entry.duration,
          tags: [
            `transfer-size:${transferSize(entry.transferSize)}`,
            `device-type:${DEVICE_TYPE}`,
            `pixel-ratio:${pixelRatio(window.devicePixelRatio)}`,
            `root-path:${rootPath}`,
            `image-service:${getImageService()}`,
          ],
        }

        return payload
      })

      sendToVolley(data)

      queue.current = []
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return queue
}

// Buckets into 100kb increments
export const transferSize = (size: number) => {
  const kb = size / 1000
  const lowerBound = Math.floor(kb / 100) * 100
  return `${lowerBound}-${lowerBound + 100}kb`
}

// Round to either 1 or 2
export const pixelRatio = (ratio: number) => {
  return ratio >= 1.5 ? 2 : 1
}
