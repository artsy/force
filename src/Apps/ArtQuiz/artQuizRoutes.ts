import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const ArtQuizApp = loadable(
  () => import(/* webpackChunkName: "artQuizBundle" */ "./ArtQuizApp"),

  {
    resolveComponent: component => component.ArtQuizApp,
  }
)

// TODO: Add query to check for quiz template
export const artQuizRoutes: AppRouteConfig[] = [
  {
    path: "/art-quiz",
    displayFullPage: true,
    hideFooter: true,
    onServerSideRender: ({ req, res }) => {
      if (!res.locals.sd.FEATURE_FLAGS["art-quiz"].flagEnabled) {
        res.redirect("/")
      }
    },
    getComponent: () => ArtQuizApp,
    onClientSideRender: () => {
      ArtQuizApp.preload()
    },
  },
]
