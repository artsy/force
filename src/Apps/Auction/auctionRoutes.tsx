import loadable from "@loadable/component"
import { Redirect } from "found"
import { graphql } from "react-relay"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { RouteProps } from "System/Router/Route"
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

export const auctionRoutes: RouteProps[] = [
  {
    path: "/auction/:slug?",
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
      const auctionFilterDefaults = {
        sort: "sale_position",
      }

      const initialFilterStateFromUrl = getInitialFilterState(
        props.location?.query ?? {}
      )

      const userSpecificFilterState = getArtworkFilterInputArgs(
        props.context.user
      )

      const variables = {
        slug: params.slug,
        input: {
          ...auctionFilterDefaults,
          ...initialFilterStateFromUrl,
          ...userSpecificFilterState,
          saleID: params.slug,
          // FIXME: Understand why this is needed to view lots in `the-artist-is-present-a-benefit-auction-for-ukraine` while logged out
          priceRange: "*-*",
        },
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
