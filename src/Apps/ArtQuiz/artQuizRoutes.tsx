import loadable from "@loadable/component"
import { Match, RedirectException } from "found"
import { graphql } from "react-relay"
import { ArtsyResponse } from "Server/middleware/artsyExpress"
import { AppRouteConfig } from "System/Router/Route"

const LOGIN_COPY = "Log in to take the Art Quiz."
const REDIRECT_URL = `/login?redirectTo=/art-quiz&afterSignUpAction=/art-quiz&copy=${LOGIN_COPY}`

const artQuizServerSideRedirect = ({ res }: { res: ArtsyResponse }) => {
  if (!res.locals.sd.FEATURE_FLAGS["art-quiz"].flagEnabled) {
    res.redirect("/")
  }
  if (!res.locals.sd.CURRENT_USER) {
    res.redirect(REDIRECT_URL)
  }
}
const artQuizClientSideRedirect = ({ match }: { match: Match }) => {
  if (!match.context.user) {
    match.router.push(REDIRECT_URL)
  }
}

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
      artQuizServerSideRedirect({ res })
      res.redirect("/art-quiz/welcome")
    },
    getComponent: () => ArtQuizApp,
    onClientSideRender: ({ match }) => {
      artQuizClientSideRedirect({ match })
      ArtQuizWelcome.preload()
      ArtQuizArtworks.preload()
      ArtQuizResults.preload()
    },
    children: [
      {
        path: "welcome",
        getComponent: () => ArtQuizWelcome,
        layout: "NavOnly",
        onClientSideRender: artQuizClientSideRedirect,
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
        onClientSideRender: ({ match }) => {
          artQuizClientSideRedirect({ match })
          ArtQuizArtworks.preload()
        },
        onServerSideRender: artQuizServerSideRedirect,
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
        layout: "NavOnly",
        onClientSideRender: ({ match }) => {
          artQuizClientSideRedirect({ match })
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
