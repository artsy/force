import { AppRouteConfig } from "System/Router/Route"
import { graphql } from "react-relay"
import loadable from "@loadable/component"

const NewForYouApp = loadable(() => import("./NewForYouApp"), {
  resolveComponent: component => component.NewForYouAppFragmentContainer,
})

export const newForYouRoutes: AppRouteConfig[] = [
  {
    path: "/new-for-you",
    getComponent: () => NewForYouApp,
    onClientSideRender: () => {
      NewForYouApp.preload()
    },
    prepareVariables: (params, props) => {
      const first = parseInt(props.location.query.first, 10) || 40
      const includeBackfill = props.location.query.includeBackfill ?? true
      const version = props.location.query.version?.toUpperCase()
      const maxWorksPerArtist = props.location.query.maxWorksPerArtist ?? 3

      return {
        ...params,
        ...props,
        first,
        includeBackfill,
        version,
        maxWorksPerArtist,
      }
    },
    query: graphql`
      query newForYouRoutes_TopLevelQuery(
        $first: Int
        $includeBackfill: Boolean!
        $version: String
        $maxWorksPerArtist: Int
      ) {
        viewer {
          ...NewForYouApp_viewer
            @arguments(
              first: $first
              includeBackfill: $includeBackfill
              version: $version
              maxWorksPerArtist: $maxWorksPerArtist
            )
        }
      }
    `,
  },
]
