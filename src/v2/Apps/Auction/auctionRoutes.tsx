import loadable from "@loadable/component"
import { ErrorPage } from "v2/Components/ErrorPage"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Redirect, confirmBidRedirect, registerRedirect } from "./getRedirect"
import { AppRouteConfig } from "v2/System/Router/Route"

const logger = createLogger("Apps/Auction/routes")

const AuctionFAQRoute = loadable(
  () =>
    import(/* webpackChunkName: "auctionBundle" */ "./Components/AuctionFAQ"),
  {
    resolveComponent: component => component.AuctionFAQFragmentContainer,
  }
)
const ConfirmBidRoute = loadable(
  () => import(/* webpackChunkName: "auctionBundle" */ "./Routes/ConfirmBid"),
  {
    resolveComponent: component => component.ConfirmBidRouteFragmentContainer,
  }
)
const RegisterRoute = loadable(
  () => import(/* webpackChunkName: "auctionBundle" */ "./Routes/Register"),
  {
    resolveComponent: component => component.RegisterRouteFragmentContainer,
  }
)

export const auctionRoutes: AppRouteConfig[] = [
  {
    path: "/auction-faq",
    theme: "v2",
    getComponent: () => AuctionFAQRoute,
    onClientSideRender: () => {
      AuctionFAQRoute.preload()
    },
    query: graphql`
      query auctionRoutes_AuctionFAQQuery {
        viewer {
          ...AuctionFAQ_viewer
        }
      }
    `,
    fetchIndicator: "overlay",
  },
  {
    path: "/auction/:saleID/bid(2)?/:artworkID",
    theme: "v2",
    getComponent: () => ConfirmBidRoute,
    onClientSideRender: () => {
      ConfirmBidRoute.preload()
    },
    render: ({ Component, props }) => {
      if (Component && props) {
        const { artwork, me, match } = props as any
        if (!artwork) {
          return <ErrorPage code={404} />
        }
        handleRedirect(
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          confirmBidRedirect({ artwork, me }, match.location),
          match.location
        )
        return <Component {...props} />
      }
    },
    query: graphql`
      query auctionRoutes_ConfirmBidQuery(
        $saleID: String!
        $artworkID: String!
      ) @raw_response_type {
        artwork(id: $artworkID) {
          internalID
          slug
          saleArtwork(saleID: $saleID) {
            internalID
            slug
            sale {
              internalID
              slug
              name
              isClosed
              isRegistrationClosed
              registrationStatus {
                internalID
                qualifiedForBidding
              }
            }
            ...LotInfo_saleArtwork
            ...BidForm_saleArtwork
          }
          ...LotInfo_artwork
        }
        me {
          internalID
          hasQualifiedCreditCards
          ...ConfirmBid_me
        }
      }
    `,
  },
  {
    path: "/auction-registration(2)?/:saleID",
    theme: "v2",
    getComponent: () => RegisterRoute,
    onClientSideRender: () => {
      RegisterRoute.preload()
    },
    render: ({ Component, props }) => {
      if (Component && props) {
        const { match, sale, me } = props as any

        if (!sale) {
          return <ErrorPage code={404} />
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        handleRedirect(registerRedirect({ sale, me }), match.location)

        return <Component {...props} />
      }
    },
    query: graphql`
      query auctionRoutes_RegisterQuery($saleID: String!) @raw_response_type {
        sale(id: $saleID) @principalField {
          slug
          isAuction
          isRegistrationClosed
          isPreview
          isOpen
          isAuction
          registrationStatus {
            qualifiedForBidding
          }
          ...Register_sale
        }
        me {
          hasQualifiedCreditCards
          ...Register_me
        }
      }
    `,
  },
]

function handleRedirect(redirect: Redirect, location: Location) {
  if (redirect) {
    logger.warn(
      `Redirecting from ${location.pathname} to ${redirect.path} because '${redirect.reason}'`
    )
    throw new RedirectException(redirect.path)
  }
}
