import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const ArtQuizApp = loadable(() => import("./ArtQuizApp"), {
  resolveComponent: component => component.ArtQuizApp,
})

const ArtQuizWelcome = loadable(() => import("./Routes/ArtQuizWelcome"), {
  resolveComponent: component => component.ArtQuizWelcome,
})

const ArtQuizArtworks = loadable(() => import("./Routes/ArtQuizArtworks"), {
  resolveComponent: component => component.ArtQuizArtworksFragmentContainer,
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
        getComponent: () => ArtQuizWelcome,
        layout: "NavOnly",
        query: graphql`
          query artQuizRoutes_WelcomeQuery {
            me {
              quiz {
                completedAt
              }
            }
          }
        `,
        render: ({ Component, props }) => {
          if (!(Component && props)) {
            return
          }
          const { me } = props as any

          if (!me?.quiz) {
            return
          }
          const { completedAt } = me.quiz

          if (completedAt) {
            throw new RedirectException("/art-quiz/results")
          }

          return <Component {...props} />
        },
      },
      {
        path: "artworks",
        getComponent: () => ArtQuizArtworks,
        layout: "NavOnly",
        onClientSideRender: () => {
          ArtQuizArtworks.preload()
        },
        query: graphql`
          query artQuizRoutes_ArtworksQuery {
            me {
              ...ArtQuizArtworks_me
            }
          }
        `,
      },
      {
        path: "results",
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
