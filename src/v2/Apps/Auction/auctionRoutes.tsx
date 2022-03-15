import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { getInitialFilterState } from "v2/Components/ArtworkFilter/Utils/getInitialFilterState"
import { AppRouteConfig } from "v2/System/Router/Route"
import { getArtworkFilterInputArgs } from "./Components/AuctionArtworkFilter"

const AuctionApp = loadable(
  () => import(/* webpackChunkName: "auctionBundle" */ "./AuctionApp"),
  {
    resolveComponent: component => component.AuctionAppFragmentContainer,
  }
)
const RegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/AuctionRegistrationRoute"
    ),
  {
    resolveComponent: component =>
      component.AuctionRegistrationRouteFragmentContainer,
  }
)
const ConfirmBidRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/Bid/AuctionBidRoute"
    ),
  {
    resolveComponent: component => component.AuctionBidRouteFragmentContainer,
  }
)
const ConfirmRegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/AuctionConfirmRegistrationRoute"
    ),
  {
    resolveComponent: component =>
      component.AuctionConfirmRegistrationRouteFragmentContainer,
  }
)
const AuctionFAQRoute = loadable(
  () =>
    import(/* webpackChunkName: "auctionBundle" */ "./Routes/AuctionFAQRoute"),
  {
    resolveComponent: component => component.AuctionFAQRouteFragmentContainer,
  }
)

export const auctionRoutes: AppRouteConfig[] = [
  {
    path: "/auction/:slug?",
    theme: "v3",
    getComponent: () => AuctionApp,
    onClientSideRender: () => {
      AuctionApp.preload()
    },
    query: graphql`
      query auctionRoutes_TopLevelQuery(
        $input: FilterArtworksInput
        $slug: String!
      ) {
        me {
          ...AuctionApp_me @arguments(saleID: $slug)
        }
        sale(id: $slug) @principalField {
          ...AuctionApp_sale
        }
        viewer {
          ...AuctionApp_viewer @arguments(input: $input, saleID: $slug)
        }
      }
    `,
    prepareVariables: (params, props) => {
      const initialFilterState = getInitialFilterState(
        props.location?.query ?? {}
      )

      return {
        slug: params.slug,
        input: {
          ...initialFilterState,
          ...getArtworkFilterInputArgs(props.context.user),
          saleID: params.slug,
        },
      }
    },
    children: [
      { path: "" },
      {
        path: "register",
        getComponent: () => RegistrationRoute,
        query: graphql`
          query auctionRoutes_RegisterRouteQuery($slug: String!) {
            me {
              ...AuctionRegistrationRoute_me
            }
            sale(id: $slug) @principalField {
              ...AuctionRegistrationRoute_sale
            }
          }
        `,
      },
      {
        path: "confirm-registration",
        getComponent: () => ConfirmRegistrationRoute,
        query: graphql`
          query auctionRoutes_ConfirmRegistrationRouteQuery($slug: String!) {
            me {
              ...AuctionConfirmRegistrationRoute_me
            }
            sale(id: $slug) @principalField {
              ...AuctionConfirmRegistrationRoute_sale
            }
          }
        `,
      },
      {
        path: "bid/:artworkSlug?",
        getComponent: () => ConfirmBidRoute,
        onClientSideRender: ({ match }) => {
          if (!match.context.user) {
            const redirectTo = match.location.pathname + match.location.search
            match.router.push(
              `/login?redirect-to=${redirectTo}&afterSignUpAction=${redirectTo}`
            )
          }
        },
        onServerSideRender: ({ req, res }) => {
          if (!req.user) {
            res.redirect(`/login?redirect=${req.originalUrl}`)
          }
        },
        ignoreScrollBehavior: true,
        query: graphql`
          query auctionRoutes_BidRouteQuery(
            $slug: String!
            $artworkSlug: String!
          ) {
            sale(id: $slug) @principalField {
              ...AuctionBidRoute_sale
            }
            artwork(id: $artworkSlug) {
              ...AuctionBidRoute_artwork
            }
            me {
              ...AuctionBidRoute_me
            }
          }
        `,
        prepareVariables: ({ slug, artworkSlug }) => {
          return {
            slug,
            artworkSlug,
          }
        },
      },
    ],
  },
  {
    path: "/auction-faq2",
    getComponent: () => AuctionFAQRoute,
    query: graphql`
      query auctionRoutes_AuctionFAQRouteQuery {
        viewer {
          ...AuctionFAQRoute_viewer
        }
      }
    `,
  },
]
