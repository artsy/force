import { useState } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { useRouteComplete } from "./useRouteComplete"

/**
 * Will return the active pathname *after*  the route completes.
 * When a route change happens the route will immediately update even though
 * the new route is still loading and hasn't been rendered. This waits until
 * the render is complete and returns the next pathname.
 */
export const usePathnameComplete = () => {
  const { match } = useRouter()
  const [pathname, setPathname] = useState(match?.location?.pathname)

  useRouteComplete({
    onComplete: () => {
      setPathname(match?.location?.pathname)
    },
  })

  return { pathname }
}
