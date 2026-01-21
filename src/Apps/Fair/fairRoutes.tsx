import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { canonicalSlugRedirect } from "System/Router/Utils/canonicalSlugRedirect"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const fairWithCanonicalSlugRedirect = canonicalSlugRedirect({
  entityName: "fair",
  paramName: "slug",
  basePath: "/fair",
})

const FairApp = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./FairApp"),
  {
    resolveComponent: component => component.FairAppFragmentContainer,
  },
)
const FairSubApp = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./FairSubApp"),
  {
    resolveComponent: component => component.FairSubAppFragmentContainer,
  },
)
const FairOverviewRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairOverview"),
  {
    resolveComponent: component => component.FairOverviewFragmentContainer,
  },
)
const FairExhibitorsRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairExhibitors"),
  {
    resolveComponent: component => component.FairExhibitorsFragmentContainer,
  },
)
const FairArtworksRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairArtworks"),
  {
    resolveComponent: component => component.FairArtworksQueryRenderer,
  },
)
const FairArticlesRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairArticles"),
  {
    resolveComponent: component => component.FairArticlesPaginationContainer,
  },
)

export const fairRoutes: RouteProps[] = [
  {
    path: "/fair/:slug?",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => FairApp,
    onPreloadJS: () => {
      FairApp.preload()
    },
    render: fairWithCanonicalSlugRedirect,
    query: graphql`
      query fairRoutes_FairQuery($slug: String!) @cacheable {
        fair(id: $slug) @principalField {
          slug
          ...FairApp_fair
        }
      }
    `,
    children: [
      {
        path: "",
        getComponent: () => FairOverviewRoute,
        onPreloadJS: () => {
          FairOverviewRoute.preload()
        },
        query: graphql`
          query fairRoutes_FairOverviewQuery($slug: String!) @cacheable {
            fair(id: $slug) @principalField {
              ...FairOverview_fair
            }
          }
        `,
      },
      {
        path: "exhibitors(.*)?",
        getComponent: () => FairExhibitorsRoute,
        onPreloadJS: () => {
          FairExhibitorsRoute.preload()
        },
        query: graphql`
          query fairRoutes_FairExhibitorsQuery($slug: String!) @cacheable {
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
        onPreloadJS: () => {
          FairArtworksRoute.preload()
        },
      },
    ],
  },
  // NOTE: Nested sub-apps are mounted under the same top-level path as above.
  // The root `path: ""` matches the `FairExhibitorsRoute`.
  {
    path: "/fair/:slug",
    getComponent: () => FairSubApp,
    onPreloadJS: () => {
      FairSubApp.preload()
    },
    render: fairWithCanonicalSlugRedirect,
    query: graphql`
      query fairRoutes_FairSubAppQuery($slug: String!) @cacheable {
        fair(id: $slug) @principalField {
          slug
          ...FairSubApp_fair
        }
      }
    `,
    children: [
      {
        path: "articles",
        getComponent: () => FairArticlesRoute,
        onPreloadJS: () => {
          FairArticlesRoute.preload()
        },
        query: graphql`
          query fairRoutes_FaiArticlesQuery($slug: String!) @cacheable {
            fair(id: $slug) @principalField {
              ...FairArticles_fair
            }
          }
        `,
      },
    ],
  },
]
