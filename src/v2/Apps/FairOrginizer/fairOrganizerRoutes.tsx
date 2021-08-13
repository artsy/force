import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const FairOrganizerApp = loadable(
  () =>
    import(/* webpackChunkName: "fairOrganizerBundle" */ "./FairOrganizerApp"),
  {
    resolveComponent: component => component.FairOrganizerAppFragmentContainer,
  }
)

const FairOrganizerDedicatedArticles = loadable(
  () =>
    import(
      /* webpackChunkName: "fairOrganizerBundle" */ "./Routes/FairOrganizerDedicatedArticles"
    ),
  {
    resolveComponent: component =>
      component.FairOrganizerDedicatedArticlesFragmentContainer,
  }
)

export const fairOrganizerRoutes: AppRouteConfig[] = [
  {
    path: "/fair-organizer/:slug",
    theme: "v3",
    getComponent: () => FairOrganizerApp,
    prepare: () => {
      FairOrganizerApp.preload()
    },
    query: graphql`
      query fairOrganizerRoutes_FairOrganizerQuery($slug: String!) {
        fairOrganizer(id: $slug) @principalField {
          ...FairOrganizerApp_fairOrganizer
        }
        pastFairs: fairsConnection(
          first: 20
          fairOrganizerID: $slug
          sort: START_AT_DESC
          status: CLOSED
          hasFullFeature: true
        ) {
          ...FairOrganizerApp_pastFairs
        }
      }
    `,
  },
  {
    path: "/fair-organizer/:slug/articles",
    theme: "v3",
    getComponent: () => FairOrganizerDedicatedArticles,
    prepare: () => {
      FairOrganizerDedicatedArticles.preload()
    },
    prepareVariables: ({ slug }, { location }) => {
      const { page } = location.query
      return { page, slug }
    },
    query: graphql`
      query fairOrganizerRoutes_FairOrganizerDedicatedArticles_Query(
        $slug: String!
        $page: Int
      ) {
        fairOrganizer(id: $slug) @principalField {
          ...FairOrganizerDedicatedArticles_fairOrganizer
            @arguments(page: $page)
        }
      }
    `,
  },
]
