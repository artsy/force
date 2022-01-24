import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { initialArtworkFilterState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { AppRouteConfig } from "v2/System/Router/Route"

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

const ViewinRoomsRoute = loadable(
  () => import(/* webpackChunkName: "partnerBundle" */ "./Routes/ViewingRooms"),
  {
    resolveComponent: component => component.ViewingRoomFragmentContainer,
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
    path: "/partner/:partnerId",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => PartnerApp,
    onClientSideRender: () => {
      PartnerApp.preload()
    },
    query: graphql`
      query partnerRoutes_PartnerQuery($partnerId: String!) {
        partner(id: $partnerId) @principalField {
          partnerType
          displayFullPartnerPage
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

      const overviewPath = `/partner/${match.params.partnerId}`

      if (
        !partner.displayFullPartnerPage &&
        partner.partnerType !== "Brand" &&
        match.location.pathname !== overviewPath
      ) {
        throw new RedirectException(overviewPath, 302)
      }

      return <Component {...props} />
    },
    children: [
      {
        path: "",
        getComponent: () => OverviewRoute,
        onClientSideRender: () => {
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
        path: "overview",
        render: props => {
          throw new RedirectException(
            `/partner/${props.match.params.partnerId}`,
            302
          )
        },
      },
      {
        path: "shows",
        getComponent: () => ShowsRoute,
        onClientSideRender: () => {
          ShowsRoute.preload()
        },
        query: graphql`
          query partnerRoutes_ShowsQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              counts {
                displayableShows
              }
              ...Shows_partner
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
            counts: { displayableShows },
          } = partner

          if (!displayableShows) {
            throw new RedirectException(
              `/partner/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
      {
        path: "viewing-rooms",
        getComponent: () => ViewinRoomsRoute,
        onClientSideRender: () => {
          ViewinRoomsRoute.preload()
        },
        query: graphql`
          query partnerRoutes_ViewingRoomsQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              ...ViewingRooms_partner
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

          return <Component {...props} />
        },
      },
      {
        path: "works",
        getComponent: () => WorksRoute,
        onClientSideRender: () => {
          WorksRoute.preload()
        },
        prepareVariables: (data, props) => {
          const filterStateFromUrl = props.location ? props.location.query : {}
          const aggregations = [
            "TOTAL",
            "MEDIUM",
            "MATERIALS_TERMS",
            "ARTIST_NATIONALITY",
            "ARTIST",
          ]

          if (!!props.context.user) {
            aggregations.push("FOLLOWED_ARTISTS")
          }

          const filterParams = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(filterStateFromUrl),
          }

          return {
            aggregations,
            input: allowedFilters(filterParams),
            partnerId: data.partnerId,
            shouldFetchCounts: !!props.context.user,
          }
        },
        query: graphql`
          query partnerRoutes_WorksQuery(
            $partnerId: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
            $shouldFetchCounts: Boolean!
          ) {
            partner(id: $partnerId) @principalField {
              ...Works_partner
                @arguments(
                  input: $input
                  aggregations: $aggregations
                  shouldFetchCounts: $shouldFetchCounts
                )
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
              `/partner/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
      {
        path: "artists/:artistId?",
        ignoreScrollBehavior: true,
        getComponent: () => ArtistsRoute,
        onClientSideRender: () => {
          ArtistsRoute.preload()
        },
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
              `/partner/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
      {
        path: "articles",
        getComponent: () => ArticlesRoute,
        onClientSideRender: () => {
          ArticlesRoute.preload()
        },
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
              `/partner/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
      {
        path: "contact",
        getComponent: () => ContactRoute,
        onClientSideRender: () => {
          ContactRoute.preload()
        },
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

          if (!partner.locations || partner.locations.totalCount === 0) {
            throw new RedirectException(
              `/partner/${match.params.partnerId}`,
              302
            )
          }

          return <Component {...props} />
        },
      },
    ],
  },
]
