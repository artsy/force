import React from "react"
import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { ErrorPage } from "v2/Components/ErrorPage"
import { AppRouteConfig } from "v2/System/Router/Route"
import { RedirectException } from "found"
import { extractNodes } from "v2/Utils/extractNodes"

const FairOrganizerApp = loadable(
  () =>
    import(/* webpackChunkName: "fairOrganizerBundle" */ "./FairOrganizerApp"),
  {
    resolveComponent: component => component.FairOrganizerAppFragmentContainer,
  }
)

const FairOrganizerDedicatedArticles = loadable(
  () =>
    import(
      /* webpackChunkName: "fairOrganizerBundle" */ "./Routes/FairOrganizerDedicatedArticles"
    ),
  {
    resolveComponent: component =>
      component.FairOrganizerDedicatedArticlesFragmentContainer,
  }
)

export const fairOrganizerRoutes: AppRouteConfig[] = [
  {
    path: "/fair-organizer/:slug",
    theme: "v3",
    getComponent: () => FairOrganizerApp,
    prepare: () => {
      FairOrganizerApp.preload()
    },
    render: ({ Component, props }) => {
      if (Component && props) {
        const { fairOrganizer } = props as any
        const { profile, runningFairs } = fairOrganizer

        if (!profile) {
          return <ErrorPage code={404} />
        }

        const activeFair = extractNodes(runningFairs)[0]
        if (activeFair) {
          const { href } = activeFair as any
          throw new RedirectException(href, 302)
        }

        return <Component {...props} />
      }
    },
    query: graphql`
      query fairOrganizerRoutes_FairOrganizerQuery($slug: String!) {
        fairOrganizer(id: $slug) @principalField {
          profile {
            __typename
          }
          runningFairs: fairsConnection(first: 1, status: RUNNING) {
            edges {
              node {
                href
              }
            }
          }
          ...FairOrganizerApp_fairOrganizer
        }
      }
    `,
  },
  {
    path: "/fair-organizer/:slug/articles",
    theme: "v3",
    getComponent: () => FairOrganizerDedicatedArticles,
    prepare: () => {
      FairOrganizerDedicatedArticles.preload()
    },
    prepareVariables: ({ slug }, { location }) => {
      const { page } = location.query
      return { page, slug }
    },
    query: graphql`
      query fairOrganizerRoutes_FairOrganizerDedicatedArticles_Query(
        $slug: String!
        $page: Int
      ) {
        fairOrganizer(id: $slug) @principalField {
          ...FairOrganizerDedicatedArticles_fairOrganizer
            @arguments(page: $page)
        }
      }
    `,
  },
]
