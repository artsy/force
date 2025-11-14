import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const PressApp = loadable(
  () => import(/* webpackChunkName: "pressBundle" */ "./PressApp"),
  {
    resolveComponent: component => component.PressAppFragmentContainer,
  },
)

export const pressRoutes: RouteProps[] = [
  {
    path: "/press/in-the-media",

    getComponent: () => PressApp,
    onPreloadJS: () => {
      PressApp.preload()
    },
    query: graphql`
      query pressRoutes_InTheMediaQuery {
        page(id: "in-the-media") @principalField {
          ...PressApp_page
        }
      }
    `,
  },
  {
    path: "/press/press-releases",

    getComponent: () => PressApp,
    onPreloadJS: () => {
      PressApp.preload()
    },
    query: graphql`
      query pressRoutes_PressReleasesQuery {
        page(id: "news-and-press-releases") @principalField {
          ...PressApp_page
        }
      }
    `,
  },
]
