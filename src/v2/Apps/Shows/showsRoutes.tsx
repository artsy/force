import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const ShowsApp = loadable(
  () => import(/* webpackChunkName: "showsBundle" */ "./ShowsApp"),
  {
    resolveComponent: component => component.ShowsApp,
  }
)

const ShowsIndexRoute = loadable(
  () => import(/* webpackChunkName: "showsBundle" */ "./Routes/ShowsIndex"),
  {
    resolveComponent: component => component.ShowsIndexFragmentContainer,
  }
)

const ShowsCityRoute = loadable(
  () => import(/* webpackChunkName: "showsBundle" */ "./Routes/ShowsCity"),
  {
    resolveComponent: component => component.ShowsCityFragmentContainer,
  }
)

export const showsRoutes: RouteConfig[] = [
  {
    path: "/shows2",
    getComponent: () => ShowsApp,
    prepare: () => {
      return ShowsApp.preload()
    },
    children: [
      {
        theme: "v3",
        path: "",
        getComponent: () => ShowsIndexRoute,
        prepare: () => {
          return ShowsIndexRoute.preload()
        },
        query: graphql`
          query showsRoutes_ShowsIndexQuery {
            viewer {
              ...ShowsIndex_viewer
            }
            featuredShows: orderedSet(id: "530ebe92139b21efd6000071") {
              ...ShowsIndex_featuredShows
            }
          }
        `,
      },
      {
        theme: "v3",
        path: ":slug",
        getComponent: () => ShowsCityRoute,
        prepare: () => {
          return ShowsCityRoute.preload()
        },
        query: graphql`
          query showsRoutes_ShowsCityQuery($slug: String!) {
            viewer {
              ...ShowsCity_viewer
            }
            city(slug: $slug) {
              ...ShowsCity_city
            }
          }
        `,
      },
    ],
  },
]
