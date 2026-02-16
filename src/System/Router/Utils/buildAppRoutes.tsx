import { AppShell } from "Apps/Components/AppShell"
import type { buildAppRoutesQuery$data } from "__generated__/buildAppRoutesQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { RouteProps } from "System/Router/Route"
import { interceptLinks } from "System/Router/Utils/interceptLinks"
import { type Match, type Router, withRouter } from "found"
import { useEffect } from "react"
import { graphql } from "react-relay"
import { NavigationDataProvider } from "System/Contexts/NavigationDataContext"
import { getENV } from "Utils/getENV"

export function buildAppRoutes(routes: RouteProps[][]): RouteProps[] {
  const children = routes.flat()
  const enableServerDrivenNavigation = getENV("ENABLE_SERVER_DRIVEN_NAVIGATION")

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

    // Extract navigation data from props (only when server-driven nav is enabled)
    const navigationData =
      enableServerDrivenNavigation && props.whatsNewNavigation
        ? {
            whatsNewNavigation: props.whatsNewNavigation,
            artistsNavigation: props.artistsNavigation,
            artworksNavigation: props.artworksNavigation,
            whatsNewFeaturedLink: props.whatsNewFeaturedLink,
            artistsFeaturedLink: props.artistsFeaturedLink,
            artworksFeaturedLink: props.artworksFeaturedLink,
          }
        : null

    const appShell = <AppShell {...props} />

    // Wrap in NavigationDataProvider only when server-driven nav is enabled
    if (enableServerDrivenNavigation) {
      return (
        <NavigationDataProvider navigationData={navigationData}>
          {appShell}
        </NavigationDataProvider>
      )
    }

    return appShell
  }

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  const route: RouteProps = {
    Component: withRouter(Component),
    children,
    path: "",
  }

  // Include query and prepareVariables only when server-driven nav is enabled
  if (enableServerDrivenNavigation) {
    route.query = graphql`
      query buildAppRoutesQuery($requestedVersionState: NavigationVersionState!)
      @cacheable {
        whatsNewNavigation: navigationVersion(
          groupID: "whats-new"
          state: $requestedVersionState
        ) {
          ...NavBarSubMenuServer_navigationVersion
          ...NavBarMobileSubMenuServer_navigationVersion
        }

        artistsNavigation: navigationVersion(
          groupID: "artists"
          state: $requestedVersionState
        ) {
          ...NavBarSubMenuServer_navigationVersion
          ...NavBarMobileSubMenuServer_navigationVersion
        }

        artworksNavigation: navigationVersion(
          groupID: "artworks"
          state: $requestedVersionState
        ) {
          ...NavBarSubMenuServer_navigationVersion
          ...NavBarMobileSubMenuServer_navigationVersion
        }

        whatsNewFeaturedLink: orderedSets(key: "nav-visual:whats-new") {
          ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData
        }

        artistsFeaturedLink: orderedSets(key: "nav-visual:artists") {
          ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData
        }

        artworksFeaturedLink: orderedSets(key: "nav-visual:artworks") {
          ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData
        }
      }
    `
    route.prepareVariables = (_params, props) => {
      // Detect DRAFT mode from query parameter
      const isDraftMode = props.location?.query?.navigationVersion === "draft"
      return {
        requestedVersionState: isDraftMode ? "DRAFT" : "LIVE",
      }
    }
  }

  return [route]
}
