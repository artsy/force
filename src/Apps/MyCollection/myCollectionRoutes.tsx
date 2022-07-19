import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "System/Router/Route"

const MyCollectionApp = loadable(
  () =>
    import(/* webpackChunkName: "myCollectionBundle" */ "./MyCollectionApp"),
  {
    resolveComponent: component => component.MyCollectionAppRefetchContainer,
  }
)

export const myCollectionRoutes: AppRouteConfig[] = [
  {
    path: "/my-collection",
    getComponent: () => MyCollectionApp,
    onClientSideRender: () => {
      MyCollectionApp.preload()
    },
    query: graphql`
      query myCollectionRoutes_MyCollectionQuery {
        me {
          ...MyCollectionApp_me
        }
      }
    `,
  },
]
