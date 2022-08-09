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
    // TODO: use this query when working on my collection artwork page tasks [CX-2707 OR CX-2708].
    // prepareVariables: ({ artworkSlug }, props) => {
    //   return {
    //     artworkSlug,
    //   }
    // },
    // query: graphql`
    //   query artworkRoutes_ArtworkQuery($artworkSlug: String!) {
    //     artwork(id: $artworkSlug) @principalField {
    //       ...ArtworkApp_artwork
    //     }
    //     me {
    //       ...ArtworkApp_me
    //     }
    //   }
    // `,
    // cacheConfig: {
    //   force: true,
    // },
  },
]
