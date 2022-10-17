import { useEffect, useRef } from "react"
import { sendToVolley, VolleyMetric } from "Server/volley"
import { getENV } from "Utils/getENV"
import { GEMINI_CLOUDFRONT_URL } from "Utils/resizer"

const DEVICE_TYPE = getENV("IS_MOBILE") ? "mobile" : "desktop"

export const useImagePerformanceObserver = () => {
  const queue = useRef<
    Pick<
      PerformanceResourceTiming,
      "initiatorType" | "transferSize" | "name" | "duration"
    >[]
  >([])

  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return

    const performanceObserver = new PerformanceObserver(observedEntries => {
      const entries = observedEntries.getEntries()

      entries.forEach((entry: PerformanceResourceTiming) => {
        if (
          // Only log images
          entry.initiatorType !== "img" ||
          // Ensure they are uncached
          entry.transferSize === 0 ||
          // Ensure they are Gemini images
          !entry.name.includes(GEMINI_CLOUDFRONT_URL)
        ) {
          return
        }

        queue.current.push(entry)
      })
    })

    performanceObserver.observe({
      type: "resource",
      buffered: true,
    })

    return () => {
      performanceObserver.disconnect()
    }
  }, [])

  // Every 5 seconds, send the queue to the server
  useEffect(() => {
    const interval = setInterval(() => {
      const entries = queue.current

      if (entries.length === 0) return

      const data = entries.map(entry => {
        const payload: VolleyMetric = {
          type: "timing",
          name: "image.load-time",
          timing: entry.duration,
          tags: [
            `transfer-size:${bucket(entry.transferSize)}`,
            `device-type:${DEVICE_TYPE}`,
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

type Bucket = "sm" | "md" | "lg" | "xl"

const bucket = (size: number): Bucket => {
  // 0 - 100kb
  if (size < 100000) return "sm"
  // 100kb - 200kb
  if (size < 200000) return "md"
  // 200kb - 300kb
  if (size < 300000) return "lg"
  // 300kb+
  return "xl"
}
