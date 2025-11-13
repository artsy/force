import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { PLACE_REDIRECTS } from "./redirects"

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
    resolveComponent: component => component.ShowsCityRefetchContainer,
  }
)

const ShowsAllCities = loadable(
  () => import(/* webpackChunkName: "showsBundle" */ "./Routes/ShowsAllCities"),
  {
    resolveComponent: component => component.ShowsAllCitiesFragmentContainer,
  }
)

export const showsRoutes: RouteProps[] = [
  {
    path: "/shows",
    getComponent: () => ShowsApp,
    onPreloadJS: () => {
      return ShowsApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => ShowsIndexRoute,
        onPreloadJS: () => {
          return ShowsIndexRoute.preload()
        },
        query: graphql`
          query showsRoutes_ShowsIndexQuery @cacheable {
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
        path: "all-cities",
        getComponent: () => ShowsAllCities,
        onPreloadJS: () => {
          return ShowsAllCities.preload()
        },
        query: graphql`
          query showsRoutes_ShowsAllCitiesQuery @cacheable {
            viewer {
              ...ShowsAllCities_viewer
            }
          }
        `,
      },
      {
        path: ":slug",
        getComponent: () => ShowsCityRoute,
        onPreloadJS: () => {
          return ShowsCityRoute.preload()
        },
        prepareVariables: ({ slug }: { slug: string }, props) => {
          const place = PLACE_REDIRECTS[slug]

          if (typeof place === "string") {
            throw new RedirectException(place, 301)
          }

          return {
            slug,
            ...props,
            page: Number.parseInt(props.location.query.page, 10) || 1,
          }
        },
        query: graphql`
          query showsRoutes_ShowsCityQuery($slug: String!, $page: Int)
          @cacheable {
            viewer {
              ...ShowsCity_viewer
            }
            city(slug: $slug) @principalField {
              ...ShowsCity_city @arguments(page: $page)
            }
          }
        `,
      },
    ],
  },
  {
    path: "/city/:slug",
    render: ({
      match: {
        params: { slug },
      },
    }) => {
      throw new RedirectException(`/shows/${slug}`, 301)
    },
  },
]
