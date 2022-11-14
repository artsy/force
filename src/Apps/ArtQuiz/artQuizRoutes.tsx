import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

// const ArtQuizApp = loadable(() => import("./ArtQuizApp"), {
//   resolveComponent: component => component.ArtQuizAppFragmentContainer,
// })

const ArtQuizWelcome = loadable(() => import("./Routes/ArtQuizWelcome"), {
  resolveComponent: component => component.ArtQuizWelcome,
})

const ArtQuizMain = loadable(() => import("./Routes/ArtQuizMain"), {
  resolveComponent: component => component.ArtQuizMainFragmentContainer,
})

const ArtQuizResults = loadable(() => import("./Routes/ArtQuizResults"), {
  resolveComponent: component => component.ArtQuizResults,
})

export const artQuizRoutes: AppRouteConfig[] = [
  {
    path: "/art-quiz",
    displayFullPage: true,
    hideFooter: true,
    onServerSideRender: ({ res }) => {
      if (!res.locals.sd.FEATURE_FLAGS["art-quiz"].flagEnabled) {
        res.redirect("/")
      }
      res.redirect("/art-quiz/welcome")
    },
    onClientSideRender: () => {
      ArtQuizWelcome.preload()
      ArtQuizMain.preload()
      ArtQuizResults.preload()
    },
    children: [
      {
        path: "welcome",
        getComponent: () => ArtQuizWelcome,
        query: graphql`
          query artQuizRoutes_WelcomeQuery {
            viewer {
              quizConnection {
                completedAt
              }
            }
          }
        `,
        render: ({ Component, props }) => {
          if (!(Component && props)) {
            return
          }
          const { viewer } = props as any

          if (!viewer?.quizConnection) {
            return
          }

          const { completedAt } = viewer.quizConnection

          if (completedAt) {
            throw new RedirectException("/art-quiz/results")
          }

          return <Component {...props} />
        },
      },
      {
        path: "artworks",
        getComponent: () => ArtQuizMain,
        query: graphql`
          query artQuizRoutes_MainQuery {
            viewer {
              quizConnection {
                ...ArtQuizMain_quiz
              }
            }
          }
        `,
        render: ({ Component, props }) => {
          if (!(Component && props)) {
            return
          }

          const { viewer } = props as any

          return <Component {...props} quiz={viewer.quizConnection} />
        },
      },
      {
        path: "results",
        getComponent: () => ArtQuizResults,
        hideFooter: true,
        onClientSideRender: () => {
          ArtQuizResults.preload()
        },
      },
    ],
  },
]
