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

export const fairOrganizerRoutes: AppRouteConfig[] = [
  {
    path: "/fair-organizer/:slug",
    theme: "v3",
    getComponent: () => FairOrganizerApp,
    prepare: () => {
      FairOrganizerApp.preload()
    },
    prepareVariables: params => {
      return {
        id: params.slug,
      }
    },
    query: graphql`
      query fairOrganizerRoutes_FairQuery($id: String!) {
        fair(id: $id) {
          ...FairOrganizerApp_fair
        }
      }
    `,
  },
]
