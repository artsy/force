import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const WorksForYouApp = loadable(
  () => import(/* webpackChunkName: "worksForYouBundle" */ "./WorksForYouApp"),
  {
    resolveComponent: component => component.WorksForYouAppFragmentContainer,
  },
)

export const worksForYouRoutes: RouteProps[] = [
  {
    path: "/works-for-you/:artistSlug?",
    getComponent: () => WorksForYouApp,
    onPreloadJS: () => {
      WorksForYouApp.preload()
    },
    query: graphql`
      query worksForYouRoutes_TopLevelQuery(
        $includeSelectedArtist: Boolean!
        $artistSlug: String!
      ) {
        viewerArtist: viewer {
          ...WorksForYouApp_viewerArtist
            @include(if: $includeSelectedArtist)
            @arguments(artistSlug: $artistSlug)
        }
        viewerFeed: viewer {
          ...WorksForYouApp_viewerFeed @skip(if: $includeSelectedArtist)
        }
        viewerMe: viewer {
          ...WorksForYouApp_viewerMe
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
