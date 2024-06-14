import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException } from "found"
import { RouteProps } from "System/Router/Route"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"

const ShowApp = loadable(
  () => import(/* webpackChunkName: "showBundle" */ "./ShowApp"),
  {
    resolveComponent: component => component.ShowAppFragmentContainer,
  }
)
const ShowSubApp = loadable(
  () => import(/* webpackChunkName: "showBundle" */ "./ShowSubApp"),
  {
    resolveComponent: component => component.ShowSubAppFragmentContainer,
  }
)
const ShowInfoRoute = loadable(
  () => import(/* webpackChunkName: "showBundle" */ "./Routes/ShowInfo"),
  {
    resolveComponent: component => component.ShowInfoFragmentContainer,
  }
)

export const showRoutes: RouteProps[] = [
  {
    getComponent: () => ShowApp,
    path: "/show/:slug",
    onClientSideRender: () => {
      ShowApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query showRoutes_ShowQuery(
        $slug: String!
        $input: FilterArtworksInput
        $aggregations: [ArtworkAggregation]
        $shouldFetchCounts: Boolean!
      ) {
        show(id: $slug) @principalField {
          ...ShowApp_show
            @arguments(
              input: $input
              aggregations: $aggregations
              shouldFetchCounts: $shouldFetchCounts
            )
        }
      }
    `,
  },
  // NOTE: Nested sub-apps are mounted under the same top-level path as above.
  // The root `path: ""` matches the `ShowApp` route.
  {
    children: [
      {
        getComponent: () => ShowInfoRoute,
        path: "info",
        onClientSideRender: () => {
          ShowInfoRoute.preload()
        },
        query: graphql`
          query showRoutes_ShowInfoQuery($slug: String!) {
            show(id: $slug) @principalField {
              ...ShowInfo_show
            }
          }
        `,
      },
      {
        path: "hours",
        render: props => {
          throw new RedirectException(`/show/${props.match.params.slug}`, 302)
        },
      },
    ],
    getComponent: () => ShowSubApp,
    path: "/show/:slug",
    onClientSideRender: () => {
      ShowSubApp.preload()
    },
    query: graphql`
      query showRoutes_ShowSubAppQuery($slug: String!) {
        show(id: $slug) @principalField {
          ...ShowSubApp_show
        }
      }
    `,
  },
]

function initializeVariablesWithFilterState({ slug }, props) {
  const initialFilterState = getInitialFilterState(props.location?.query ?? {})

  const aggregations = [
    "MEDIUM",
    "TOTAL",
    "MAJOR_PERIOD",
    "ARTIST_NATIONALITY",
    "MATERIALS_TERMS",
    "ARTIST",
  ]

  if (!!props.context.user) {
    aggregations.push("FOLLOWED_ARTISTS")
  }

  const input = {
    sort: "partner_show_position",
    ...initialFilterState,
  }

  return { slug, input, aggregations, shouldFetchCounts: !!props.context.user }
}
