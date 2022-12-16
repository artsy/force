import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const ArtQuizApp = loadable(() => import("./ArtQuizApp"), {
  resolveComponent: component => component.ArtQuizApp,
})

const ArtQuizWelcome = loadable(() => import("./Routes/ArtQuizWelcome"), {
  resolveComponent: component => component.ArtQuizWelcome,
})

const ArtQuizArtworks = loadable(() => import("./Routes/ArtQuizArtworks"), {
  resolveComponent: component => component.ArtQuizArtworks,
})

const ArtQuizResults = loadable(() => import("./Routes/ArtQuizResults"), {
  resolveComponent: component => component.ArtQuizResultsFragmentContainer,
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
    getComponent: () => ArtQuizApp,
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
        query: graphql`
          query artQuizRoutes_ArtQuizResultsQuery {
            me {
              ...ArtQuizResults_me
            }
          }
        `,
      },
    ],
  },
]
