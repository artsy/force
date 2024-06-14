import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException } from "found"
import { RouteProps } from "System/Router/Route"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"

const FairApp = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./FairApp"),
  {
    resolveComponent: component => component.FairAppFragmentContainer,
  }
)
const FairSubApp = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./FairSubApp"),
  {
    resolveComponent: component => component.FairSubAppFragmentContainer,
  }
)
const FairOverviewRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairOverview"),
  {
    resolveComponent: component => component.FairOverviewFragmentContainer,
  }
)
const FairExhibitorsRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairExhibitors"),
  {
    resolveComponent: component => component.FairExhibitorsFragmentContainer,
  }
)
const FairArtworksRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairArtworks"),
  {
    resolveComponent: component => component.FairArtworksRefetchContainer,
  }
)
const FairArticlesRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairArticles"),
  {
    resolveComponent: component => component.FairArticlesPaginationContainer,
  }
)

export const fairRoutes: RouteProps[] = [
  {
    path: "/fair/:slug",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => FairApp,
    onClientSideRender: () => {
      FairApp.preload()
    },
    query: graphql`
      query fairRoutes_FairQuery($slug: String!) {
        fair(id: $slug) @principalField {
          ...FairApp_fair
        }
      }
    `,
    children: [
      {
        path: "",
        getComponent: () => FairOverviewRoute,
        onClientSideRender: () => {
          FairOverviewRoute.preload()
        },
        query: graphql`
          query fairRoutes_FairOverviewQuery($slug: String!) {
            fair(id: $slug) @principalField {
              ...FairOverview_fair
            }
          }
        `,
      },
      {
        path: "exhibitors(.*)?",
        getComponent: () => FairExhibitorsRoute,
        onClientSideRender: () => {
          FairExhibitorsRoute.preload()
        },
        query: graphql`
          query fairRoutes_FairExhibitorsQuery($slug: String!) {
            fair(id: $slug) @principalField {
              ...FairExhibitors_fair
            }
          }
        `,
      },
      {
        path: "booths(.*)?",
        render: ({ match }) => {
          const slug = match.params.slug
          throw new RedirectException(`/fair/${slug}`, 301)
        },
      },
      {
        path: "artworks(.*)?",
        getComponent: () => FairArtworksRoute,
        onClientSideRender: () => {
          FairArtworksRoute.preload()
        },
        prepareVariables: initializeVariablesWithFilterState,
        query: graphql`
          query fairRoutes_FairArtworksQuery(
            $slug: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) {
            fair(id: $slug) @principalField {
              ...FairArtworks_fair
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `,
      },
    ],
  },
  // NOTE: Nested sub-apps are mounted under the same top-level path as above.
  // The root `path: ""` matches the `FairExhibitorsRoute`.
  {
    path: "/fair/:slug",
    getComponent: () => FairSubApp,
    onClientSideRender: () => {
      FairSubApp.preload()
    },
    query: graphql`
      query fairRoutes_FairSubAppQuery($slug: String!) {
        fair(id: $slug) @principalField {
          ...FairSubApp_fair
        }
      }
    `,
    children: [
      {
        path: "articles",
        getComponent: () => FairArticlesRoute,
        onClientSideRender: () => {
          FairArticlesRoute.preload()
        },
        query: graphql`
          query fairRoutes_FaiArticlesQuery($slug: String!) {
            fair(id: $slug) @principalField {
              ...FairArticles_fair
            }
          }
        `,
      },
    ],
  },
]

function initializeVariablesWithFilterState({ slug }, props) {
  const initialFilterState = getInitialFilterState(props.location?.query ?? {})

  let aggregations: string[] = [
    "TOTAL",
    "MAJOR_PERIOD",
    "ARTIST",
    "LOCATION_CITY",
    "ARTIST_NATIONALITY",
    "MATERIALS_TERMS",
    "PARTNER",
  ]

  const input = {
    sort: "-decayed_merch",
    ...initialFilterState,
    includeArtworksByFollowedArtists:
      !!props.context.user &&
      initialFilterState["includeArtworksByFollowedArtists"],
    aggregations: !!props.context.user ? ["FOLLOWED_ARTISTS"] : undefined,
  }

  return {
    slug,
    input,
    aggregations,
  }
}
