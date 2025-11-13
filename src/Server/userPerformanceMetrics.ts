// Forked and modified from UXM: https://github.com/treosh/uxm

import ttiPolyfill from "tti-polyfill"

declare let PerformancePaintTiming: any

/**
 * `window.performance` or `null`
 */
const perf = typeof window !== "undefined" ? window.performance : null
const timingAvailable = perf && perf.timing

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

/**
 * Aggregates all marks and measures into a single report
 */
export function getUserTiming() {
  if (typeof PerformanceMark === "undefined") return null

  const marks = perf?.getEntriesByType("mark").map(mark => {
    return {
      type: "mark",
      name: mark.name,
      startTime: Math.round(mark.startTime),
    }
  })

  const measures = perf?.getEntriesByType("measure").map(measure => {
    return {
      type: "measure",
      name: measure.name,
      startTime: Math.round(measure.startTime),
      duration: Math.round(measure.duration),
    }
  })

  return marks?.concat(measures || [])
}

/**
 * The time it takes to render something visually different then what was on
 * the screen during the last navigation
 */
export function getFirstPaint() {
  if (typeof PerformancePaintTiming === "undefined") return null

  const firstPaint = perf
    ?.getEntriesByType("paint")
    .find(({ name }) => name === "first-paint")
  return firstPaint ? Math.round(firstPaint.startTime) : null
}

/**
 * The time it takes to render the first bit of visible content in the dom
 */
export function getFirstContentfulPaint() {
  if (typeof PerformancePaintTiming === "undefined") return null

  const firstContentfulPaint = perf
    ?.getEntriesByType("paint")
    .find(({ name }) => name === "first-contentful-paint")
  return firstContentfulPaint
    ? Math.round(firstContentfulPaint.startTime)
    : null
}

/**
 * The time it took for the load event to complete
 */
export function getLoadEventEnd() {
  if (!timingAvailable) return null
  return sanitizedMetrics(perf.timing.requestStart, perf.timing.loadEventEnd)
}

/**
 * Time it takes for the dom to finish parsing and building the initial dom tree.
 * Subresources like css, images will start processing after this event
 *
 * https://varvy.com/performance/dominteractive.html
 */
export function getDomInteractive() {
  if (!timingAvailable) return null
  return sanitizedMetrics(perf.timing.requestStart, perf.timing.domInteractive)
}

/**
 * The domInteractive phase has finished, the dom and CSSOM are complete, and
 * _all parser blocking javascript has been executed_.
 *
 *
 * https://varvy.com/performance/domcontentloaded.html
 */
export function getDomContentLoadedStart() {
  if (!timingAvailable) return null
  return sanitizedMetrics(
    perf.timing.requestStart,
    perf.timing.domContentLoadedEventStart
  )
}

/**
 * DomContentLoaded has finished executing any queued tasks on the event loop
 * TODO: Determine if this metric is valuable and remove it if it is not
 *
 * https://varvy.com/performance/domcontentloaded.html
 */
export function getDomContentLoadedEnd() {
  if (!timingAvailable) return null
  return sanitizedMetrics(
    perf.timing.requestStart,
    perf.timing.domContentLoadedEventEnd
  )
}

/**
 * Time it takes for all of the processing to complete and all of the resources
 * on the page (images, etc.) to finish downloading
 *
 * https://varvy.com/performance/domcomplete.html
 */
export function getDomComplete() {
  if (!timingAvailable) return null
  return sanitizedMetrics(perf.timing.requestStart, perf.timing.domComplete)
}

export async function getTTI() {
  if (!timingAvailable) return null
  return Math.round(await ttiPolyfill.getFirstConsistentlyInteractive())
}
