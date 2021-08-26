/**
 * Handler for `found-scroll` used for determining if scroll management should
 * be applied on route change, based on keys attached to a route.
 *
 * @see https://github.com/4Catalyzer/found-scroll#custom-scroll-behavior
 */

const getParentRoute = routes => {
  let parentRoute

  if (Array.isArray(routes)) {
    parentRoute = routes.find(
      route => route.ignoreScrollBehaviorBetweenChildren
    )
  }

  return parentRoute ?? null
}

export function shouldUpdateScroll(prevRenderArgs, { routes }) {
  try {
    // If true, don't reset scroll position on route change
    if (routes?.some(route => route.ignoreScrollBehavior)) {
      return false
    }

    if (routes.some(route => route.scrollToTop)) {
      return [0, 0]
    }

    const parentRoute = getParentRoute(routes)
    const prevParentRoute = getParentRoute(prevRenderArgs?.routes)

    if (
      prevParentRoute &&
      parentRoute &&
      prevParentRoute.path === parentRoute.path
    ) {
      console.log("[debug] parent navigate")
      return false
    }
  } catch (error) {
    console.error("[Router/Utils/shouldUpdateScroll] Error:", error)
  }
  return true
}
