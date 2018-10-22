// Forked and modified from UXM: https://github.com/treosh/uxm

declare let PerformancePaintTiming: any

/**
 * `window.performance` or `null`
 */
const perf = typeof window !== "undefined" ? window.performance : null

/**
 * Returns a duration if both inputs are valid and start occurs before end,
 * otherwise returns `null`.
 */
const sanitizedMetrics = (start: number, end: number): number | null =>
  start > 0 && end > 0 && end - start > 0 ? end - start : null

/**
 * Marks a specific point in execution time to signify when something happened
 * or to be used as the start or end of a measurement later
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 */
export function mark(markName: string) {
  if (perf && perf.mark) {
    perf.mark(markName)
  }
}

/**
 * Provides a duration between two marks, a starting mark and when measure is called,
 * or since the start of the page load and when measure is called.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure
 *
 * @param measureName The name of this measurement
 * @param startMarkName A string representing the name of the measure's starting mark. May also be the name of a PerformanceTiming property.
 * @param endMarkName A string representing the name of the measure's ending mark. May also be the name of a PerformanceTiming property.
 */
export function measure(
  measureName: string,
  startMarkName?: string,
  endMarkName?: string
) {
  if (perf && perf.measure) {
    // If the start mark or end mark are specified but don't exist then then
    // measure will throw an exception.
    try {
      perf.measure(measureName, startMarkName, endMarkName)
    } catch (err) {
      console.error(err)
    }
  }
}

export function getUserTiming() {
  if (!perf || typeof PerformanceMark === "undefined") return null
  const marks = perf.getEntriesByType("mark").map(mark => {
    return {
      type: "mark",
      name: mark.name,
      startTime: Math.round(mark.startTime),
    }
  })
  const measures = perf.getEntriesByType("measure").map(measure => {
    return {
      type: "measure",
      name: measure.name,
      startTime: Math.round(measure.startTime),
      duration: Math.round(measure.duration),
    }
  })
  return marks.concat(measures)
}

export function getFirstPaint() {
  if (typeof PerformancePaintTiming === "undefined") return null
  const firstPaint = perf
    .getEntriesByType("paint")
    .find(({ name }) => name === "first-paint")
  return firstPaint ? Math.round(firstPaint.startTime) : null
}

export function getFirstContentfulPaint() {
  if (typeof PerformancePaintTiming === "undefined") return null
  const firstContentfulPaint = perf
    .getEntriesByType("paint")
    .find(({ name }) => name === "first-contentful-paint")
  return firstContentfulPaint
    ? Math.round(firstContentfulPaint.startTime)
    : null
}

export function getOnLoad() {
  if (!perf || !perf.timing) return null
  return sanitizedMetrics(perf.timing.requestStart, perf.timing.loadEventEnd)
}

export function getDomContentLoaded() {
  if (!perf || !perf.timing) return null
  return sanitizedMetrics(
    perf.timing.requestStart,
    perf.timing.domContentLoadedEventEnd
  )
}

export function getDomComplete() {
  if (!perf || !perf.timing) return null
  return sanitizedMetrics(perf.timing.requestStart, perf.timing.domComplete)
}

export function getDeviceMemory() {
  const deviceMemory =
    // @ts-ignore
    typeof navigator !== "undefined" ? navigator.deviceMemory : undefined
  if (deviceMemory === undefined) return null
  return deviceMemory > 1 ? "full" : "lite"
}

/**
 * In order for this method to work you'll need to inject this snippet of JS in
 * the head section of the site markup
 *
 * !function(){if('PerformanceLongTaskTiming' in window){var g=window.__lt={e:[]};
 * g.o=new PerformanceObserver(function(l){g.e=g.e.concat(l.getEntries())});
 * g.o.observe({entryTypes:['longtask']})}}();
 */
export function getLongTasks() {
  if (typeof (window as any).__lt === "undefined") return null
  return (window as any).__lt.e.map(longTask => ({
    startTime: Math.round(longTask.startTime),
    duration: Math.round(longTask.duration),
  }))
}
