import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "react-relay"

const Search2App = loadable(
  () => import(/* webpackChunkName: "search2Bundle" */ "./Search2App"),
  {
    resolveComponent: component => component.Search2App,
  }
)

const Search2Home = loadable(
  () => import(/* webpackChunkName: "search2Bundle" */ "./routes/Search2Home"),
  {
    resolveComponent: component => component.Search2Home,
  }
)

const Search2Result = loadable(
  () =>
    import(
      /* webpackChunkName: "search2Bundle" */ "./routes/Search2Results/Search2Results"
    ),
  {
    resolveComponent: component => component.Search2ResultsFragmentContainer,
  }
)

export const search2Routes: AppRouteConfig[] = [
  {
    path: "/search2",
    getComponent: () => Search2App,
    onClientSideRender: () => {
      Search2App.preload()
    },
    children: [
      {
        path: "/",
        getComponent: () => Search2Home,
        onClientSideRender: () => {
          Search2Home.preload()
        },
      },
      {
        path: "results",
        getComponent: () => Search2Result,
        onClientSideRender: () => {
          Search2Result.preload()
        },
        query: graphql`
          query search2Routes_Search2ResultsQuery {
            system {
              ...Search2Results_system
            }
          }
        `,
      },
    ],
  },
]
