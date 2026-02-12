import { AppShell } from "Apps/Components/AppShell"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { RouteProps } from "System/Router/Route"
import { interceptLinks } from "System/Router/Utils/interceptLinks"
import { type Match, type Router, withRouter } from "found"
import { useEffect } from "react"
import { graphql } from "react-relay"
import { NavigationDataProvider } from "System/Contexts/NavigationDataContext"

export function buildAppRoutes(routes: RouteProps[][]): RouteProps[] {
  const children = routes.flat()

  const Component: React.FC<
    React.PropsWithChildren<{
      children: React.ReactNode
      match: Match
      router: Router
      // Query data props from buildAppRoutesQuery
      whatsNewNavigation?: any
      artistsNavigation?: any
      artworksNavigation?: any
      whatsNewFeaturedLink?: any
      artistsFeaturedLink?: any
      artworksFeaturedLink?: any
    }>
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

    // Extract navigation data from props
    const navigationData = props.whatsNewNavigation
      ? {
          whatsNewNavigation: props.whatsNewNavigation,
          artistsNavigation: props.artistsNavigation,
          artworksNavigation: props.artworksNavigation,
          whatsNewFeaturedLink: props.whatsNewFeaturedLink,
          artistsFeaturedLink: props.artistsFeaturedLink,
          artworksFeaturedLink: props.artworksFeaturedLink,
        }
      : null

    return (
      <NavigationDataProvider navigationData={navigationData}>
        <AppShell {...props} />
      </NavigationDataProvider>
    )
  }

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  return [
    {
      Component: withRouter(Component),
      children,
      path: "",
      query: graphql`
        query buildAppRoutesQuery(
          $requstedVersionState: NavigationVersionState!
        ) {
          whatsNewNavigation: navigationVersion(
            groupID: "whats-new"
            state: $requstedVersionState
          ) {
            ...NavBarSubMenuServer_navigationVersion
            ...NavBarMobileSubMenuServer_navigationVersion
          }

          artistsNavigation: navigationVersion(
            groupID: "artists"
            state: $requstedVersionState
          ) {
            ...NavBarSubMenuServer_navigationVersion
            ...NavBarMobileSubMenuServer_navigationVersion
          }

          artworksNavigation: navigationVersion(
            groupID: "artworks"
            state: $requstedVersionState
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
      `,
      prepareVariables: (_params, props) => {
        // Detect DRAFT mode from query parameter
        const isDraftMode = props.location?.query?.navigationVersion === "draft"
        return {
          requstedVersionState: isDraftMode ? "DRAFT" : "LIVE",
        }
      },
    },
  ]
}
