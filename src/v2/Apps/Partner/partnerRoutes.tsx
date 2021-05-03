import React from "react"
import loadable from "@loadable/component"
import { RedirectException, RouteConfig } from "found"
import { graphql } from "react-relay"

const PartnerApp = loadable(() => import("./PartnerApp"), {
  resolveComponent: component => component.PartnerAppFragmentContainer,
})

const ArticlesRoute = loadable(() => import("./Routes/Articles"), {
  resolveComponent: component => component.ArticlesPaginationContainer,
})

const OverviewRoute = loadable(() => import("./Routes/Overview"), {
  resolveComponent: component => component.OverviewFragmentContainer,
})

const ShowsRoute = loadable(() => import("./Routes/Shows"), {
  resolveComponent: component => component.ShowsFragmentContainer,
})

const WorksRoute = loadable(() => import("./Routes/Works"), {
  resolveComponent: component => component.ArtworksRefetchContainer,
})

const ArtistsRoute = loadable(() => import("./Routes/Artists"), {
  resolveComponent: component => component.ArtistsRouteFragmentContainer,
})

const ContactRoute = loadable(() => import("./Routes/Contact"), {
  resolveComponent: component => component.ContactRouteFragmentContainer,
})

export const partnerRoutes: RouteConfig[] = [
  {
    getComponent: () => PartnerApp,
    path: "/partner2/:partnerId",
    prepare: () => {
      PartnerApp.preload()
    },
    query: graphql`
      query partnerRoutes_PartnerQuery($partnerId: String!) {
        partner(id: $partnerId) @principalField {
          ...PartnerApp_partner
        }
      }
    `,
    children: [
      {
        getComponent: () => OverviewRoute,
        path: "",
        prepare: () => {
          OverviewRoute.preload()
        },
        ignoreScrollBehavior: true,
        query: graphql`
          query partnerRoutes_OverviewQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              ...Overview_partner
            }
          }
        `,
      },
      {
        getComponent: () => ArticlesRoute,
        path: "articles",
        prepare: () => {
          ArticlesRoute.preload()
        },
        ignoreScrollBehavior: true,
        query: graphql`
          query partnerRoutes_ArticlesQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              articles: articlesConnection(first: 0) {
                totalCount
              }
              ...Articles_partner
            }
          }
        `,
        render: ({ Component, props, match }) => {
          if (!(Component && props)) {
            return
          }

          const { partner } = props as any

          if (!partner) {
            return
          }

          const {
            articles: { totalCount },
          } = partner

          if (!totalCount) {
            throw new RedirectException(
              `/partner2/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
      {
        getComponent: () => ShowsRoute,
        path: "shows",
        ignoreScrollBehavior: true,
        prepare: () => {
          ShowsRoute.preload()
        },
        query: graphql`
          query partnerRoutes_ShowsQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              ...Shows_partner
            }
          }
        `,
      },
      {
        getComponent: () => WorksRoute,
        path: "works",
        prepare: () => {
          WorksRoute.preload()
        },
        ignoreScrollBehavior: true,
        query: graphql`
          query partnerRoutes_WorksQuery(
            $partnerId: String!
            $input: FilterArtworksInput
          ) {
            partner(id: $partnerId) @principalField {
              ...Works_partner @arguments(input: $input)
            }
          }
        `,
      },
      {
        getComponent: () => ArtistsRoute,
        path: "artists/:artistId?",
        prepare: () => {
          ArtistsRoute.preload()
        },
        ignoreScrollBehavior: true,
        query: graphql`
          query partnerRoutes_ArtistsQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              ...Artists_partner
              displayArtistsSection
              artists: artistsConnection(first: 20, after: null) {
                totalCount
              }
            }
          }
        `,
        render: ({ Component, props, match }) => {
          if (!(Component && props)) {
            return undefined
          }

          const { partner } = props as any

          if (!partner) {
            return undefined
          }

          if (
            !(
              partner.displayArtistsSection &&
              partner.artists &&
              partner.artists.totalCount > 0
            )
          ) {
            throw new RedirectException(
              `/partner2/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
      {
        getComponent: () => ContactRoute,
        path: "contact",
        prepare: () => {
          ContactRoute.preload()
        },
        ignoreScrollBehavior: true,
        query: graphql`
          query partnerRoutes_ContactQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              ...Contact_partner
              locations: locationsConnection(first: 50) {
                totalCount
              }
            }
          }
        `,
        render: ({ Component, props, match }) => {
          if (!(Component && props)) {
            return undefined
          }

          const { partner } = props as any

          if (!partner) {
            return undefined
          }

          if (partner.locations.totalCount === 0) {
            throw new RedirectException(
              `/partner2/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
      {
        path: "overview",
        render: props => {
          throw new RedirectException(
            `/partner2/${props.match.params.partnerId}`,
            302
          )
        },
      },
    ],
  },
]
