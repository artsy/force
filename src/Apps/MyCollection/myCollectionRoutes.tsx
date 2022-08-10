import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const MyCollectionArtworkApp = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/MyCollectionArtwork/MyCollectionArtworkApp"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkAppFragmentContainer,
  }
)

export const myCollectionRoutes: AppRouteConfig[] = [
  {
    path: "/my-collection/artwork/:Slug",
    getComponent: () => MyCollectionArtworkApp,
    onClientSideRender: () => {
      MyCollectionArtworkApp.preload()
    },
  },
]
