import { useContext } from "react"
import { Match, Router } from "found"
import RouterContext from "found/RouterContext"
import { RouteProps } from "System/Router/Route"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"

export function useRouter(): {
  match: Match
  router: Router
  route: RouteProps
  silentPush: (path: string) => void
  silentReplace: (path: string) => void
} {
  const { match, router } =
    useContext<{
      match: Match<any>
      router: Router
    }>(RouterContext) ?? {}

  const route = findCurrentRoute(match)

  const silentPush = (path: string) => {
    history.pushState({}, "", path)
  }

  const silentReplace = (path: string) => {
    history.replaceState({}, "", path)
  }

  return { match, router, route, silentPush, silentReplace }
}

export function useIsRouteActive(
  to: string | null | undefined,
  options = { exact: true }
): boolean {
  const { match, router } = useRouter()

  if (!to) return false
  if (match === undefined && router === undefined) return false

  const toLocation = router.createLocation(to)
  const isActive = router.isActive(match, toLocation, options)

  return isActive
}
