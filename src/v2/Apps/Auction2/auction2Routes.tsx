import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { getInitialFilterState } from "v2/Components/ArtworkFilter/Utils/getInitialFilterState"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { AppRouteConfig } from "v2/System/Router/Route"
import { getArtworkFilterInputArgs } from "./Components/AuctionArtworkFilter"

const Auction2App = loadable(
  () => import(/* webpackChunkName: "auction2Bundle" */ "./Auction2App"),
  {
    resolveComponent: component => component.Auction2AppFragmentContainer,
  }
)
const RegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/Auction2RegistrationRoute"
    ),
  {
    resolveComponent: component =>
      component.Auction2RegistrationRouteFragmentContainer,
  }
)
const ConfirmBidRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/Bid/Auction2BidRoute"
    ),
  {
    resolveComponent: component => component.Auction2BidRouteFragmentContainer,
  }
)
const ConfirmRegistrationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auction2Bundle" */ "./Routes/Auction2ConfirmRegistrationRoute"
    ),
  {
    resolveComponent: component =>
      component.Auction2ConfirmRegistrationRouteFragmentContainer,
  }
)
const AuctionFAQRoute = loadable(
  () =>
    import(/* webpackChunkName: "auction2Bundle" */ "./Routes/AuctionFAQRoute"),
  {
    resolveComponent: component => component.AuctionFAQRouteFragmentContainer,
  }
)

export const auction2Routes: AppRouteConfig[] = [
  {
    path: "/auction2/:slug?",
    theme: "v3",
    getComponent: () => Auction2App,
    onClientSideRender: () => {
      Auction2App.preload()
    },
    query: graphql`
      query auction2Routes_TopLevelQuery(
        $input: FilterArtworksInput
        $slug: String!
      ) {
        me {
          ...Auction2App_me @arguments(saleID: $slug)
        }
        sale(id: $slug) @principalField {
          ...Auction2App_sale
        }
        viewer {
          ...Auction2App_viewer @arguments(input: $input, saleID: $slug)
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
          query auction2Routes_RegisterRouteQuery($slug: String!) {
            me {
              ...Auction2RegistrationRoute_me
            }
            sale(id: $slug) @principalField {
              ...Auction2RegistrationRoute_sale
            }
          }
        `,
      },
      {
        path: "confirm-registration",
        getComponent: () => ConfirmRegistrationRoute,
        query: graphql`
          query auction2Routes_ConfirmRegistrationRouteQuery($slug: String!) {
            me {
              ...Auction2ConfirmRegistrationRoute_me
            }
            sale(id: $slug) @principalField {
              ...Auction2ConfirmRegistrationRoute_sale
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
          query auction2Routes_BidRouteQuery(
            $slug: String!
            $artworkSlug: String!
          ) {
            sale(id: $slug) @principalField {
              ...Auction2BidRoute_sale
            }
            artwork(id: $artworkSlug) {
              ...Auction2BidRoute_artwork
            }
            me {
              ...Auction2BidRoute_me
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
      query auction2Routes_AuctionFAQRouteQuery {
        viewer {
          ...AuctionFAQRoute_viewer
        }
      }
    `,
  },
]
