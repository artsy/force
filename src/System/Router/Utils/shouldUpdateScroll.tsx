import { isEqual } from "lodash"
import { cleanObject } from "Utils/cleanObject"

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
    // If true, don't reset scroll position on route change, no matter what
    if (routes?.some(route => route.ignoreScrollBehavior)) {
      return false
    }

    // If params are changing between routes, we're likely transitioning between
    // different types of pages, or different artists / artworks (but the same
    // page), etc, so in that case we generally always want to jump to top
    const prevParams = cleanObject(prevRenderArgs?.params)
    const currentParams = cleanObject(currentRenderArgs?.params)
    if (!isEqual(prevParams, currentParams)) {
      return true
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
