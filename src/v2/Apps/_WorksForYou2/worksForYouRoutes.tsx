import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const WorksForYou2App = loadable(
  () =>
    import(/* webpackChunkName: "worksForYou2Bundle" */ "./WorksForYou2App"),
  {
    resolveComponent: component => component.WorksForYou2AppFragmentContainer,
  }
)

export const worksForYouRoutes: AppRouteConfig[] = [
  {
    path: "/works-for-you2/:artistSlug?",
    getComponent: () => WorksForYou2App,
    query: graphql`
      query worksForYouRoutes_TopLevelQuery(
        $includeSelectedArtist: Boolean!
        $artistSlug: String!
      ) {
        viewerArtist: viewer {
          ...WorksForYou2App_viewerArtist
            @include(if: $includeSelectedArtist)
            @arguments(artistSlug: $artistSlug)
        }
        viewerFeed: viewer {
          ...WorksForYou2App_viewerFeed @skip(if: $includeSelectedArtist)
        }
        viewerMe: viewer {
          ...WorksForYou2App_viewerMe
        }
        viewerSidebarAggregations: viewer {
          ...WorksForYou2App_viewerSidebarAggregations
        }
      }
    `,
    prepareVariables: params => {
      const { artistSlug = "" } = params

      return {
        includeSelectedArtist: !!artistSlug,
        artistSlug,
      }
    },
  },
]
