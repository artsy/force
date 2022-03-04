import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"
import { redirect } from "v2/System/Server/redirectHelper"

const WorksForYouApp = loadable(
  () => import(/* webpackChunkName: "worksForYouBundle" */ "./WorksForYouApp"),
  {
    resolveComponent: component => component.WorksForYouAppFragmentContainer,
  }
)

export const worksForYouRoutes: AppRouteConfig[] = [
  {
    path: "/works-for-you/:artistSlug?",
    getComponent: () => WorksForYouApp,
    onServerSideRender: ({ req, res }) => {
      if (!req.user) {
        redirect({ url: "/", ...{ req, res } })
      }
    },
    onClientSideRender: () => {
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
        viewerSidebarAggregations: viewer {
          ...WorksForYouApp_viewerSidebarAggregations
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
