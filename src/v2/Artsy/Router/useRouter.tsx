import { useContext } from "react"

// FIXME: Upgrade to Found 5.0: https://github.com/4Catalyzer/found/releases/tag/v0.5.0
// @ts-ignore
import { RouterContext, Router, Match } from "found"

export function useRouter(): {
  match: Match
  router: Router
} {
  const { match, router } = useContext(RouterContext)
  return {
    match,
    router,
  }
}

export function useIsRouteActive(to, options = { exact: true }): boolean {
  const { match, router } = useRouter()
  const toLocation = router.createLocation(to)
  const isActive = router.isActive(match, toLocation, options)
  return isActive
}
