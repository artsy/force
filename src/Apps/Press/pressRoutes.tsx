import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const PressApp = loadable(
  () => import(/* webpackChunkName: "pressBundle" */ "./PressApp"),
  {
    resolveComponent: component => component.PressAppFragmentContainer,
  }
)

export const pressRoutes: RouteProps[] = [
  {
    path: "/press/in-the-media",

    getComponent: () => PressApp,
    onClientSideRender: () => {
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
    onClientSideRender: () => {
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
