import type { ArtsyResponse } from "Server/middleware/artsyExpress"
import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const LOGIN_COPY = "Log in to take the art quiz."
const REDIRECT_URL = `/login?redirectTo=/art-quiz&copy=${LOGIN_COPY}`

const artQuizServerSideRedirect = ({ res }: { res: ArtsyResponse }) => {
  if (!res.locals.sd.CURRENT_USER) {
    res.redirect(REDIRECT_URL)
  }
}

const ArtQuizApp = loadable(
  () => import(/* webpackChunkName: "artQuizBundle" */ "./ArtQuizApp"),
  { resolveComponent: component => component.ArtQuizApp }
)

const ArtQuizWelcome = loadable(
  () =>
    import(/* webpackChunkName: "artQuizBundle" */ "./Routes/ArtQuizWelcome"),
  { resolveComponent: component => component.ArtQuizWelcome }
)

const ArtQuizArtworks = loadable(
  () =>
    import(/* webpackChunkName: "artQuizBundle" */ "./Routes/ArtQuizArtworks"),
  { resolveComponent: component => component.ArtQuizArtworksFragmentContainer }
)

const ArtQuizResults = loadable(
  () =>
    import(/* webpackChunkName: "artQuizBundle" */ "./Routes/ArtQuizResults"),
  { resolveComponent: component => component.ArtQuizResultsFragmentContainer }
)

export const artQuizRoutes: RouteProps[] = [
  {
    path: "/art-quiz",
    onServerSideRender: ({ res }) => {
      artQuizServerSideRedirect({ res })
      res.redirect("/art-quiz/welcome")
    },
    getComponent: () => ArtQuizApp,
    onPreloadJS: () => {
      ArtQuizWelcome.preload()
      ArtQuizArtworks.preload()
      ArtQuizResults.preload()
    },
    children: [
      {
        path: "welcome",
        getComponent: () => ArtQuizWelcome,
        layout: "NavOnly",
        onServerSideRender: artQuizServerSideRedirect,
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
        onPreloadJS: () => {
          ArtQuizArtworks.preload()
        },
        onServerSideRender: artQuizServerSideRedirect,
        query: graphql`
          query artQuizRoutes_ArtworksQuery {
            me {
              ...ArtQuizArtworks_me
            }
            artworksConnection(first: 1) {
              edges {
                node {
                  isSaved
                }
              }
            }
          }
        `,
      },
      {
        path: "results",
        getComponent: () => ArtQuizResults,
        layout: "NavOnly",
        onPreloadJS: () => {
          ArtQuizResults.preload()
        },
        onServerSideRender: artQuizServerSideRedirect,
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
