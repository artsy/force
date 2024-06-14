import { Router } from "found"
import { RouteProps } from "System/Router/Route"
import { catchLinks } from "System/Router/Utils/catchLinks"

interface InterceptLinksProps {
  router: Router
  routes: RouteProps[]
}

/**
 * Intercept <a> tags on page and if contained within router route
 * manifest, navigate via router versus doing a hard jump between pages.
 */
export function interceptLinks({ router, routes }: InterceptLinksProps) {
  catchLinks(window, href => {
    const [pathname, _search] = href.split("?")
    // FIXME: PR upstream; `matchRoutes` is missing from type definition
    // @ts-ignore
    const foundUrl = router.matcher.matchRoutes(routes, pathname)

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
