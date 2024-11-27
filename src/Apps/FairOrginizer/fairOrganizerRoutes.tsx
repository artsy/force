import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { ErrorPage } from "Components/ErrorPage"
import { RouteProps } from "System/Router/Route"
import { RedirectException, RenderProps } from "found"
import { extractNodes } from "Utils/extractNodes"
import { fairOrganizerRoutes_FairOrganizerQuery$data } from "__generated__/fairOrganizerRoutes_FairOrganizerQuery.graphql"

export interface Props
  extends RenderProps,
    fairOrganizerRoutes_FairOrganizerQuery$data {}

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

export const fairOrganizerRoutes: RouteProps[] = [
  {
    path: "/fair-organizer/:slug",
    getComponent: () => FairOrganizerApp,
    onClientSideRender: () => {
      FairOrganizerApp.preload()
    },
    render: ({ Component, props }) => {
      if (Component && props) {
        const { fairOrganizer } = props as Props
        const { profile, runningFairs } = fairOrganizer!
        if (!profile) {
          return <ErrorPage code={404} />
        }

        const activeFair = extractNodes(runningFairs)[0]
        if (activeFair?.profile && activeFair?.href) {
          throw new RedirectException(activeFair.href, 302)
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
          runningFairs: fairsConnection(
            first: 1
            status: RUNNING
            sort: START_AT_DESC
          ) {
            edges {
              node {
                href
                profile {
                  __typename
                }
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
    getComponent: () => FairOrganizerDedicatedArticles,
    onClientSideRender: () => {
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
