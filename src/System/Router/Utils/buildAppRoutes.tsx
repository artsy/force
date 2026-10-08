import { AppShell } from "Apps/Components/AppShell"
import type { buildAppRoutesQuery$data } from "__generated__/buildAppRoutesQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { RouteProps } from "System/Router/Route"
import { interceptLinks } from "System/Router/Utils/interceptLinks"
import {
  type RenderArgs,
  defaultErrorRender,
} from "System/Router/Utils/renderRouteError"
import { type Match, Redirect, type Router, withRouter } from "found"
import { useEffect } from "react"
import { graphql } from "react-relay"
import { NavigationDataProvider } from "System/Contexts/NavigationDataContext"

/**
 * Recursively walks routes and injects `defaultErrorRender` on any route that
 * has a `query` but no `render`. This ensures @principalField errors are always
 * handled instead of being silently swallowed as HTTP 200.
 */
function injectDefaultErrorRender(routes: RouteProps[]): RouteProps[] {
  return routes.map(route => {
    // Skip Found Redirect instances — spreading them into plain objects
    // destroys their prototype `render()` method, breaking the redirect.
    if (route instanceof Redirect) {
      return route
    }

    const patched = { ...route }

    if (patched.query && !patched.render) {
      patched.render = defaultErrorRender
    }

    if (patched.children) {
      patched.children = injectDefaultErrorRender(patched.children)
    }

    return patched
  })
}

export function buildAppRoutes(routes: RouteProps[][]): RouteProps[] {
  const children = injectDefaultErrorRender(routes.flat())

  const Component: React.FC<
    React.PropsWithChildren<
      {
        children: React.ReactNode
        match: Match
        router: Router
      } & Partial<buildAppRoutesQuery$data>
    >
  > = props => {
    const { router, setRouter } = useSystemContext()

    // Store global reference to router instance
    useEffect(() => {
      if (props.router !== router) {
        setRouter?.(props.router)
      }

      interceptLinks({
        router: props.router,
        routes: children,
      })
    }, [props.router, router, setRouter])

    const navigationData = {
      whatsNewNavigation: props.whatsNewNavigation ?? null,
      artistsNavigation: props.artistsNavigation ?? null,
      artworksNavigation: props.artworksNavigation ?? null,
    }

    const appShell = <AppShell {...props} />

    return (
      <NavigationDataProvider navigationData={navigationData}>
        {appShell}
      </NavigationDataProvider>
    )
  }

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  const route: RouteProps = {
    Component: withRouter(Component),
    children,
    path: "",
  }

  route.query = graphql`
    query buildAppRoutesQuery($requestedVersionState: NavigationVersionState!)
    @cacheable {
      whatsNewNavigation: navigationVersion(
        groupID: "whats-new"
        state: $requestedVersionState
      ) {
        ...NavBarSubMenu_navigationVersion
        ...NavBarMobileSubMenu_navigationVersion
      }

      artistsNavigation: navigationVersion(
        groupID: "artists"
        state: $requestedVersionState
      ) {
        ...NavBarSubMenu_navigationVersion
        ...NavBarMobileSubMenu_navigationVersion
      }

      artworksNavigation: navigationVersion(
        groupID: "artworks"
        state: $requestedVersionState
      ) {
        ...NavBarSubMenu_navigationVersion
        ...NavBarMobileSubMenu_navigationVersion
      }
    }
  `
  // The navigation query is non-critical. Without a custom `render`, found-relay
  // returns `null` for this route when the query fails (e.g. Metaphysics is
  // unreachable), and found then renders child routes bare -- without the
  // AppShell, so no nav, footer or page gutters. Render the shell regardless;
  // navigation data falls back to `null`.
  route.render = ({ Component, props, error }: RenderArgs) => {
    if (!Component || !(props || error)) return undefined

    return <Component {...props} />
  }

  route.prepareVariables = (_params, props) => {
    const isDraftMode = props.location?.query?.navigationVersion === "draft"
    return {
      requestedVersionState: isDraftMode ? "DRAFT" : "LIVE",
    }
  }

  return [route]
}
