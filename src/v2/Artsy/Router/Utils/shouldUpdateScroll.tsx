/**
 * Handler for `found-scroll` used for determining if scroll management should
 * be applied on route change, based on keys attached to a route.
 *
 * @see https://github.com/4Catalyzer/found-scroll#custom-scroll-behavior
 */
export function shouldUpdateScroll(_prevRenderArgs, { routes }) {
  try {
    // If true, don't reset scroll position on route change
    if (routes.some(route => route.ignoreScrollBehavior)) {
      return false
    }
  } catch (error) {
    console.error("[Router/Utils/shouldUpdateScroll] Error:", error)
  }
  return true
}
