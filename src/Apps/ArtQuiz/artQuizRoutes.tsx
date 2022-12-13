import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const ArtQuizWelcome = loadable(() => import("./Routes/ArtQuizWelcome"), {
  resolveComponent: component => component.ArtQuizWelcome,
})

const ArtQuizArtworks = loadable(() => import("./Routes/ArtQuizArtworks"), {
  resolveComponent: component => component.ArtQuizArtworks,
})

const ArtQuizResults = loadable(() => import("./Routes/ArtQuizResults"), {
  resolveComponent: component => component.ArtQuizResults,
})

export const artQuizRoutes: AppRouteConfig[] = [
  {
    path: "/art-quiz",
    onServerSideRender: ({ res }) => {
      if (!res.locals.sd.FEATURE_FLAGS["art-quiz"].flagEnabled) {
        res.redirect("/")
        return
      }

      res.redirect("/art-quiz/welcome")
    },
    onClientSideRender: () => {
      ArtQuizWelcome.preload()
      ArtQuizArtworks.preload()
      ArtQuizResults.preload()
    },
    children: [
      {
        path: "welcome",
        hideFooter: true,
        getComponent: () => ArtQuizWelcome,
      },
      {
        path: "artworks",
        hideFooter: true,
        getComponent: () => ArtQuizArtworks,
      },
      {
        path: "results",
        hideFooter: true,
        getComponent: () => ArtQuizResults,
      },
    ],
  },
]
