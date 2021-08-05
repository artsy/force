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

const FairOrganizerOverviewRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "fairOrganizerBundle" */ "./Components/FairOrganizerHeader/FairOrganizerHeader"
    ),
  {
    resolveComponent: component =>
      component.FairOrganizerHeaderFragmentContainer,
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
      }
    `,
    children: [
      {
        path: "",
        theme: "v3",
        getComponent: () => FairOrganizerOverviewRoute,
        prepare: () => {
          FairOrganizerOverviewRoute.preload()
        },
        query: graphql`
          query fairOrganizerRoutes_FairOrganizerHeaderQuery($slug: String!) {
            fairOrganizer(id: $slug) @principalField {
              ...FairOrganizerHeader_fairOrganizer
            }
          }
        `,
      },
    ],
  },
]
