import React from "react"
import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { initialArtworkFilterState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { AppRouteConfig } from "v2/Artsy/Router/Route"

const PartnerApp = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./PartnerApp"),
  {
    resolveComponent: component => component.PartnerAppFragmentContainer,
  }
)

const ArticlesRoute = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./Routes/Articles"),
  {
    resolveComponent: component => component.ArticlesPaginationContainer,
  }
)

const OverviewRoute = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./Routes/Overview"),
  {
    resolveComponent: component => component.OverviewFragmentContainer,
  }
)

const ShowsRoute = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./Routes/Shows"),
  {
    resolveComponent: component => component.ShowsFragmentContainer,
  }
)

const WorksRoute = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./Routes/Works"),
  {
    resolveComponent: component => component.ArtworksRefetchContainer,
  }
)

const ArtistsRoute = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./Routes/Artists"),
  {
    resolveComponent: component => component.ArtistsRouteFragmentContainer,
  }
)

const ContactRoute = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./Routes/Contact"),
  {
    resolveComponent: component => component.ContactRouteFragmentContainer,
  }
)

export const partnerRoutes: AppRouteConfig[] = [
  {
    getComponent: () => PartnerApp,
    path: "/partner2/:partnerId",
    prepare: () => {
      PartnerApp.preload()
    },
    query: graphql`
      query partnerRoutes_PartnerQuery($partnerId: String!) {
        partner(id: $partnerId) @principalField {
          fullProfileEligible
          ...PartnerApp_partner
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

      const overviewPath = `/partner2/${match.params.partnerId}`

      if (
        !partner.fullProfileEligible &&
        match.location.pathname !== overviewPath
      ) {
        throw new RedirectException(overviewPath, 302)
      }

      return <Component {...props} />
    },
    children: [
      {
        getComponent: () => OverviewRoute,
        path: "",
        prepare: () => {
          OverviewRoute.preload()
        },
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
        prepareVariables: (params, { location }) => {
          return {
            ...params,
            page: location.query.page,
          }
        },
        query: graphql`
          query partnerRoutes_ArticlesQuery($partnerId: String!, $page: Int) {
            partner(id: $partnerId) @principalField {
              articles: articlesConnection(first: 0) {
                totalCount
              }
              ...Articles_partner @arguments(page: $page)
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
        prepareVariables: (data, props) => {
          const filterStateFromUrl = props.location ? props.location.query : {}

          const filterParams = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(filterStateFromUrl),
          }

          return {
            input: {
              ...allowedFilters(filterParams),
            },
            partnerId: data.partnerId,
          }
        },
        ignoreScrollBehavior: true,
        query: graphql`
          query partnerRoutes_WorksQuery(
            $partnerId: String!
            $input: FilterArtworksInput
          ) {
            partner(id: $partnerId) @principalField {
              ...Works_partner @arguments(input: $input)
              displayWorksSection
              counts {
                eligibleArtworks
              }
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
            displayWorksSection,
            counts: { eligibleArtworks },
          } = partner

          if (!displayWorksSection || eligibleArtworks <= 0) {
            throw new RedirectException(
              `/partner2/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
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
              ...ArtistsRoute_partner
              displayArtistsSection
              allArtistsConnection(
                displayOnPartnerProfile: true
                hasNotRepresentedArtistWithPublishedArtworks: true
              ) {
                totalCount
              }
            }
          }
        `,
        render: ({ Component, props, match }) => {
          const pageProps = props as any

          if (!(Component && pageProps && pageProps.partner)) {
            return undefined
          }

          const {
            partner: { displayArtistsSection, allArtistsConnection: artists },
          } = pageProps

          if (!(displayArtistsSection && artists && artists.totalCount > 0)) {
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
