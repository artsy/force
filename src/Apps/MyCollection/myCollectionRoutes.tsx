import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "System/Router/Route"

const MyCollectionApp = loadable(
  () =>
    import(/* webpackChunkName: "myCollectionBundle" */ "./MyCollectionApp"),
  {
    resolveComponent: component => component.MyCollectionAppFragmentContainer,
  }
)

// Redirect home if the user is not logged in
const handleServerSideRender = ({ req, res }) => {
  if (!req.user) {
    res.redirect("/")
  }
}

export const myCollectionRoutes: AppRouteConfig[] = [
  {
    path: "/my-collection",
    getComponent: () => MyCollectionApp,
    onClientSideRender: () => {
      MyCollectionApp.preload()
    },
    onServerSideRender: handleServerSideRender,
    query: graphql`
      query myCollectionRoutes_MyCollectionQuery {
        me {
          ...MyCollectionApp_me
        }
      }
    `,
  },
]
