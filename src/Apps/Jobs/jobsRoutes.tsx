import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const JobsApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./JobsApp"),
  { resolveComponent: component => component.JobsAppFragmentContainer }
)

const JobApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./JobApp"),
  { resolveComponent: component => component.JobAppFragmentContainer }
)

export const jobsRoutes: RouteProps[] = [
  {
    path: "/jobs",
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
  {
    path: "/job/:id",
    getComponent: () => JobApp,
    onClientSideRender: () => {
      JobApp.preload()
    },
    query: graphql`
      query jobsRoutes_JobQuery($id: ID!) {
        job(id: $id) {
          ...JobApp_job
        }
      }
    `,
  },
]
