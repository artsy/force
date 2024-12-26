import loadable from "@loadable/component"
import { serverCacheTTLs } from "Apps/serverCacheTTLs"
import type { RouteProps } from "System/Router/Route"
import { Redirect } from "found"
import { graphql } from "react-relay"

const AuctionApp = loadable(
  () => import(/* webpackChunkName: "auctionBundle" */ "./AuctionApp"),
  {
    resolveComponent: component => component.AuctionAppFragmentContainer,
  },
)
const RegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/AuctionRegistrationRoute"
    ),
  {
    resolveComponent: component =>
      component.AuctionRegistrationRouteFragmentContainer,
  },
)
const ConfirmBidRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/Bid/AuctionBidRoute"
    ),
  {
    resolveComponent: component => component.AuctionBidRouteFragmentContainer,
  },
)
const ConfirmRegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/AuctionConfirmRegistrationRoute"
    ),
  {
    resolveComponent: component =>
      component.AuctionConfirmRegistrationRouteFragmentContainer,
  },
)
const AuctionFAQRoute = loadable(
  () =>
    import(/* webpackChunkName: "auctionBundle" */ "./Routes/AuctionFAQRoute"),
  {
    resolveComponent: component => component.AuctionFAQRouteFragmentContainer,
  },
)

export const auctionRoutes: RouteProps[] = [
  {
    path: "/auction/:slug?",
    getComponent: () => AuctionApp,
    serverCacheTTL: serverCacheTTLs.auction,
    onPreloadJS: () => {
      AuctionApp.preload()
    },
    query: graphql`
      query auctionRoutes_TopLevelQuery($slug: String!, $isLoggedIn: Boolean!) {
        me {
          ...AuctionApp_me @arguments(saleID: $slug)
        }
        sale(id: $slug) @principalField {
          ...AuctionApp_sale
        }
        viewer {
          ...AuctionApp_viewer
            @arguments(saleID: $slug, isLoggedIn: $isLoggedIn)
        }
      }
    `,
    prepareVariables: (params, props) => {
      const variables = {
        slug: params.slug,
        isLoggedIn: !!props.context.user,
      }

      return variables
    },
    children: [
      { path: "" },
      {
        path: "register",
        getComponent: () => RegistrationRoute,
        onServerSideRender: checkIfLoggedIn,
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
        onServerSideRender: checkIfLoggedIn,
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
            match.router.push(`/login?redirectTo=${redirectTo}`)
          }
        },
        onServerSideRender: checkIfLoggedIn,
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
    path: "/auction-faq",
    getComponent: () => AuctionFAQRoute,
    query: graphql`
      query auctionRoutes_AuctionFAQRouteQuery {
        viewer {
          ...AuctionFAQRoute_viewer
        }
      }
    `,
  },
  {
    // Legacy redirect for old Eigen clients
    path: "/auction-registration/:slug?",
    children: [
      new Redirect({
        from: "/",
        to: "/auction/:slug/register",
      }) as any,
    ],
  },

  {
    // Legacy redirect for old Eigen clients
    path: "/auction/:slug/buyers-premium",
    children: [
      new Redirect({
        from: "/",
        to: "/auction-faq",
      }) as any,
    ],
  },
]

function checkIfLoggedIn({ req, res }) {
  if (!req.user) {
    res.redirect(`/login?redirectTo=${req.originalUrl}`)
  }
}
