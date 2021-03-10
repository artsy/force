import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException, RouteConfig } from "found"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"
import { omit } from "lodash"

const ShowApp = loadable(() => import("./ShowApp"), {
  resolveComponent: component => component.ShowAppFragmentContainer,
})
const ShowSubApp = loadable(() => import("./ShowSubApp"), {
  resolveComponent: component => component.ShowSubAppFragmentContainer,
})
const ShowInfoRoute = loadable(() => import("./Routes/ShowInfo"), {
  resolveComponent: component => component.ShowInfoFragmentContainer,
})

export const showRoutes: RouteConfig[] = [
  {
    getComponent: () => ShowApp,
    path: "/show/:slug",
    prepare: () => {
      ShowApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query showRoutes_ShowQuery($slug: String!, $input: FilterArtworksInput) {
        show(id: $slug) @principalField {
          ...ShowApp_show @arguments(input: $input)
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
        prepare: () => {
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
    prepare: () => {
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
  const initialFilterState = props.location ? props.location.query : {}
  const aggregations = ["MEDIUM", "TOTAL", "MAJOR_PERIOD"]
  const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
    ? ["ARTIST_NATIONALITY"]
    : []
  const input = {
    sort: "partner_show_position",
    ...omit(paramsToCamelCase(initialFilterState), "fromShowGuide"), // TODO: Investigate if this param is needed.
    aggregations: aggregations.concat(additionalAggregations),
  }

  return { slug, input }
}
