import type { RouteProps } from "System/Router/Route"
import { cleanObject } from "Utils/cleanObject"
import { isEqual } from "lodash"

interface ScrollRenderArgs {
  routes?: RouteProps[]
  routeIndices?: number[]
  params?: Record<string, string>
}

/**
 * Handler for `found-scroll` used for determining if scroll management should
 * be applied on route change, based on keys attached to a route.
 *
 * @see https://github.com/4Catalyzer/found-scroll#custom-scroll-behavior
 */

const getRouteIndiceByScrollChildrenFlag = (
  renderArgs: ScrollRenderArgs | null,
): number => {
  const { routes, routeIndices } = renderArgs ?? {}
  let routeIndice: number | undefined

  if (Array.isArray(routes) && Array.isArray(routeIndices)) {
    const routeIndex = routes.findIndex(
      currentRoute => currentRoute.ignoreScrollBehaviorBetweenChildren,
    )

    if (routeIndex !== -1) {
      routeIndice = routeIndices[routeIndex]
    }
  }

  return routeIndice ?? -1
}

export function shouldUpdateScroll(
  prevRenderArgs: ScrollRenderArgs | null,
  currentRenderArgs: ScrollRenderArgs,
): boolean | [number, number] {
  const { routes } = currentRenderArgs

  try {
    // Allow individual routes to override scroll behavior via a callback.
    // Return a value to take control, or `undefined` to fall through.
    for (const route of routes ?? []) {
      if (typeof route.getScrollBehavior === "function") {
        const result = route.getScrollBehavior(
          prevRenderArgs,
          currentRenderArgs,
        )
        if (result !== undefined) return result
      }
    }

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

    if (routes?.some(route => route.scrollToTop)) {
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
