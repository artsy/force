import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const ArtQuizApp = loadable(() => import("./ArtQuizApp"), {
  resolveComponent: component => component.ArtQuizAppFragmentContainer,
})

const ArtQuizResults = loadable(() => import("./ArtQuizResults"), {
  resolveComponent: component => component.ArtQuizResults,
})

// TODO: Add query to check for quiz template
export const artQuizRoutes: AppRouteConfig[] = [
  {
    path: "/art-quiz",
    displayFullPage: true,
    hideFooter: true,
    onServerSideRender: ({ res }) => {
      if (!res.locals.sd.FEATURE_FLAGS["art-quiz"].flagEnabled) {
        res.redirect("/")
      }
    },
    onClientSideRender: () => {
      ArtQuizApp.preload()
      ArtQuizResults.preload()
    },
    children: [
      {
        path: "/",
        getComponent: () => ArtQuizApp,
        query: graphql`
          query artQuizRoutes_TopLevelQuery {
            viewer {
              quizConnection {
                completedAt
              }
              ...ArtQuizApp_viewer
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
        path: "results",
        displayFullPage: true,
        hideFooter: true,
        getComponent: () => ArtQuizResults,
        onClientSideRender: () => {
          ArtQuizResults.preload()
        },
      },
    ],
  },
]
