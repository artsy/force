type ScrollTarget = HTMLElement | number

export interface ScrollToWithCallbackOptions {
  /** Element to reveal OR an absolute Y-position within the container */
  target: ScrollTarget
  /** Scrolling container. Omit or pass `window` to use the viewport */
  container?: HTMLElement | Window
  /** Extra pixels to add (use negative numbers for upward offset) */
  offset?: number
  /** "auto" | "smooth" (default "smooth") */
  behavior?: ScrollBehavior
  /** Failsafe: callback fires after this many ms even if never reached */
  timeout?: number
  /** Callback to fire when the scroll is complete */
  onComplete?: () => void
}

/**
 * Scrolls and resolves when the destination is actually reached.
 *
 * @returns a Promise and a disposer you can call to cancel early.
 */
export const scrollToAwaitable = ({
  target,
  container = window,
  offset = 0,
  behavior = "smooth",
  timeout = 15_000,
  onComplete,
}: ScrollToWithCallbackOptions): {
  promise: Promise<void>
  cancel: () => void
} => {
  const isWindow = container === window
  const el = isWindow
    ? document.scrollingElement || document.documentElement
    : (container as HTMLElement)

  // Calculate destination relative to the scrolling context
  const baseDestination =
    typeof target === "number"
      ? target
      : (() => {
          const rect = target.getBoundingClientRect()

          if (isWindow) {
            // When scrolling the viewport, translate rect.top (viewport-relative) into document space
            return rect.top + window.scrollY
          }

          // For an arbitrary scrolling container, translate rect.top into the container's scroll space
          const containerRect = el.getBoundingClientRect()
          return rect.top - containerRect.top + el.scrollTop
        })()

  const destination = baseDestination + offset

  ;(isWindow ? window : el).scrollTo({ top: destination, behavior })

  let frameId = 0
  let resolved = false
  const within = () =>
    Math.abs((isWindow ? window.scrollY : el.scrollTop) - destination) <= 1

  const finish = () => {
    if (resolved) return
    resolved = true
    cancelAnimationFrame(frameId)
    clearTimeout(timerId)
    onComplete?.()
    resolvePromise()
  }

  const step = () => {
    if (within()) finish()
    else frameId = requestAnimationFrame(step)
  }

  frameId = requestAnimationFrame(step)

  const timerId = setTimeout(finish, timeout)

  let resolvePromise!: () => void
  const promise = new Promise<void>(res => {
    resolvePromise = res
  })

  return {
    promise,
    cancel() {
      if (!resolved) {
        cancelAnimationFrame(frameId)
        clearTimeout(timerId)
        resolved = true
        // Treat cancellation as completion to avoid dangling promises
        resolvePromise()
      }
    },
  }
}
