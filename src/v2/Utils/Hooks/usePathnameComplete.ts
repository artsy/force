import { useState } from "react"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { useRouteComplete } from "./useRouteComplete"

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
