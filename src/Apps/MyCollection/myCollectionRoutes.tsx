import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const MyCollectionArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/MyCollectionArtwork/MyCollectionArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkFragmentContainer,
  }
)

export const myCollectionRoutes: AppRouteConfig[] = [
  {
    path: "/my-collection/artwork/:Slug",
    getComponent: () => MyCollectionArtwork,
    onClientSideRender: () => {
      MyCollectionArtwork.preload()
    },
  },
]
