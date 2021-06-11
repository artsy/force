import { RouteConfig, Router } from "found"
import { catchLinks } from "./Utils/catchLinks"

interface InterceptLinksProps {
  router: Router
  routes: RouteConfig
}

/**
 * Intercept <a> tags on page and if contained within router route
 * manifest, navigate via router versus doing a hard jump between pages.
 */
export function interceptLinks({ router, routes }: InterceptLinksProps) {
  catchLinks(window, href => {
    // FIXME: PR upstream; `matchRoutes` is missing from type definition
    // @ts-ignore
    const foundUrl = router.matcher.matchRoutes(routes, href)

    if (foundUrl) {
      const location = router.createLocation(href)
      const previousHref = window.location.href

      router.push({
        ...location,
        state: {
          previousHref,
        },
      })
    } else {
      window.location.assign(href)
    }
  })
}
