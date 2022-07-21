import { useContext } from "react"
import { Match, Router, RouterContext } from "found"
import { AppRouteConfig } from "./Route"
import { findCurrentRoute } from "./Utils/findCurrentRoute"

export function useRouter(): {
  match: Match
  router: Router
  route: AppRouteConfig
} {
  const { match, router } = useContext(RouterContext) ?? {}
  const route = findCurrentRoute(match)
  return { match, router, route }
}

export function useIsRouteActive(
  to: string | null,
  options = { exact: true }
): boolean {
  const { match, router } = useRouter()

  if (!to) return false
  if (match === undefined && router === undefined) return false

  const toLocation = router.createLocation(to)
  const isActive = router.isActive(match, toLocation, options)

  return isActive
}
