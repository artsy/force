import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const NewForYouApp = loadable(
  () => import(/* webpackChunkName: "newForYouBundle" */ "./NewForYouApp"),
  {
    resolveComponent: component => component.NewForYouAppFragmentContainer,
  },
)

export const DEFAULT_NWFY_RECS_MODEL = "C"

export const newForYouRoutes: RouteProps[] = [
  {
    path: "/new-for-you",
    getComponent: () => NewForYouApp,
    onPreloadJS: () => {
      NewForYouApp.preload()
    },
    prepareVariables: (params, props) => {
      const first = Number.parseInt(props.location.query.first, 10) || 40
      const includeBackfill = props.location.query.includeBackfill ?? true
      const version =
        props.location.query.version?.toUpperCase() || DEFAULT_NWFY_RECS_MODEL
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
