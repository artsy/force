import { useContext } from "react"

import { Match, Router, RouterContext } from "found"

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
