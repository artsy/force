import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const MyCollectionArtworkApp = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionArtworkBundle" */ "./MyCollectionArtworkApp"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkAppFragmentContainer,
  }
)

export const myCollectionArtworkRoutes: AppRouteConfig[] = [
  {
    path: "/my-collection/artwork/:artworkSlug",
    getComponent: () => MyCollectionArtworkApp,
    onClientSideRender: () => {
      MyCollectionArtworkApp.preload()
    },
  },
]
