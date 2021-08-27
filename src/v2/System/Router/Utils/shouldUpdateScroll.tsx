/**
 * Handler for `found-scroll` used for determining if scroll management should
 * be applied on route change, based on keys attached to a route.
 *
 * @see https://github.com/4Catalyzer/found-scroll#custom-scroll-behavior
 */

const getRouteIndiceByScrollChildrenFlag = renderArgs => {
  const { routes, routeIndices } = renderArgs ?? {}
  let routeIndice

  if (Array.isArray(routes) && Array.isArray(routeIndices)) {
    const routeIndex = routes.findIndex(
      currentRoute => currentRoute.ignoreScrollBehaviorBetweenChildren
    )

    if (routeIndex !== -1) {
      routeIndice = routeIndices[routeIndex]
    }
  }

  return routeIndice ?? -1
}

export function shouldUpdateScroll(prevRenderArgs, currentRenderArgs) {
  const { routes } = currentRenderArgs

  try {
    // If true, don't reset scroll position on route change
    if (routes?.some(route => route.ignoreScrollBehavior)) {
      return false
    }

    if (routes.some(route => route.scrollToTop)) {
      return [0, 0]
    }

    const routeIndice = getRouteIndiceByScrollChildrenFlag(currentRenderArgs)
    const prevRouteIndice = getRouteIndiceByScrollChildrenFlag(prevRenderArgs)

    if (
      routeIndice !== -1 &&
      prevRouteIndice !== -1 &&
      routeIndice === prevRouteIndice
    ) {
      return false
    }
  } catch (error) {
    console.error("[Router/Utils/shouldUpdateScroll] Error:", error)
  }
  return true
}
