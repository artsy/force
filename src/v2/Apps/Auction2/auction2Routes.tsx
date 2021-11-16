import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const Auction2App = loadable(
  () => import(/* webpackChunkName: "auction2Bundle" */ "./Auction2App"),
  {
    resolveComponent: component => component.Auction2AppFragmentContainer,
  }
)
const ArtworksRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/Artworks/Auction2ArtworksRoute"
    ),
  {
    resolveComponent: component =>
      component.Auction2ArtworksRouteFragmentContainer,
  }
)
const ConfirmBidRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/ConfirmBid/Auction2ConfirmBidRoute"
    ),
  {
    resolveComponent: component => component.Auction2ConfirmBidRoute,
  }
)
const ConfirmRegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/ConfirmRegistration/Auction2ConfirmRegistrationRoute"
    ),
  {
    resolveComponent: component => component.Auction2ConfirmRegistrationRoute,
  }
)
const RegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/Registration/Auction2RegistrationRoute"
    ),
  {
    resolveComponent: component => component.Auction2RegistrationRoute,
  }
)
const RegistrationFlowRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/RegistrationFlow/Auction2RegistrationFlowRoute"
    ),
  {
    resolveComponent: component => component.Auction2RegistrationFlowRoute,
  }
)
const AuctionFAQRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/FAQ/Auction2FAQRoute"
    ),
  {
    resolveComponent: component => component.Auction2FAQRoute,
  }
)

export const auction2Routes: AppRouteConfig[] = [
  {
    path: "/auction2/:slug",
    theme: "v3",
    getComponent: () => Auction2App,
    query: graphql`
      query auction2Routes_TopLevelQuery($slug: String!) {
        sale(id: $slug) @principalField {
          ...Auction2App_sale
        }
        me {
          ...Auction2App_me
        }
      }
    `,
    children: [
      {
        path: "/",
        getComponent: () => ArtworksRoute,
        query: graphql`
          query auction2Routes_ArtworksRouteQuery($slug: String!) {
            sale(id: $slug) @principalField {
              ...Auction2ArtworksRoute_sale
            }
          }
        `,
      },
      {
        path: "bid/:artworkID",
        getComponent: () => ConfirmBidRoute,
      },
      {
        path: "auction-registration",
        getComponent: () => RegistrationRoute,
      },
      {
        path: "confirm-registration",
        getComponent: () => ConfirmRegistrationRoute,
      },
      {
        path: "registration-flow",
        getComponent: () => RegistrationFlowRoute,
      },
    ],
  },
  {
    path: "/auction-faq2",
    getComponent: () => AuctionFAQRoute,
  },
]
