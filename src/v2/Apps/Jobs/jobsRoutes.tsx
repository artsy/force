import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const JobsApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./JobsApp"),
  {
    resolveComponent: component => component.JobsAppFragmentContainer,
  }
)

export const jobsRoutes: AppRouteConfig[] = [
  {
    path: "/jobs2",
    getComponent: () => JobsApp,
    onClientSideRender: () => {
      JobsApp.preload()
    },
    query: graphql`
      query jobsRoutes_JobsQuery {
        viewer {
          ...JobsApp_viewer
        }
      }
    `,
  },
]
