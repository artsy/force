import {
  Column,
  GridColumns,
  Join,
  Spacer,
  Flex,
  Spinner,
  Text,
} from "@artsy/palette"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { getENV } from "Utils/getENV"
import { ArtworkApp_artwork$data } from "__generated__/ArtworkApp_artwork.graphql"
import { ArtworkApp_me$data } from "__generated__/ArtworkApp_me.graphql"
import { ArtistInfoQueryRenderer } from "./Components/ArtistInfo"
import { ArtworkTopContextBarFragmentContainer } from "./Components/ArtworkTopContextBar/ArtworkTopContextBar"
import { ArtworkDetailsQueryRenderer } from "./Components/ArtworkDetails"
import { ArtworkImageBrowserFragmentContainer } from "./Components/ArtworkImageBrowser/ArtworkImageBrowser"
import { ArtworkMetaFragmentContainer } from "./Components/ArtworkMeta"
import { ArtworkRelatedArtistsQueryRenderer } from "./Components/ArtworkRelatedArtists"
import { OtherWorksQueryRenderer } from "./Components/OtherWorks"
import { ArtworkArtistSeriesQueryRenderer } from "./Components/ArtworkArtistSeries"
import { PricingContextQueryRenderer } from "./Components/PricingContext"
import { SubmittedOrderModalQueryRenderer } from "./Components/SubmittedOrderModal"
import { withSystemContext } from "System/SystemContext"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { RecentlyViewed } from "Components/RecentlyViewed"
import { useRouter } from "System/Router/useRouter"
import { TrackingProp } from "react-tracking"
import { Analytics } from "System/Analytics/AnalyticsContext"
import { useRouteComplete } from "Utils/Hooks/useRouteComplete"
import { Media } from "Utils/Responsive"
import { UseRecordArtworkView } from "./useRecordArtworkView"
import { Router, Match } from "found"
import { WebsocketContextProvider } from "System/WebsocketContext"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"
import { UnlistedArtworkBannerFragmentContainer } from "Components/UnlistedArtworkBanner"
import { useCallback, useEffect } from "react"
import { ArtworkSidebarFragmentContainer } from "./Components/ArtworkSidebar/ArtworkSidebar"
import { ArtworkDetailsPartnerInfoQueryRenderer } from "Apps/Artwork/Components/ArtworkDetails/ArtworkDetailsPartnerInfo"
import { ArtworkAuctionCreateAlertHeaderFragmentContainer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertHeader"
import { compact } from "lodash"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { FullBleedBanner } from "Components/FullBleedBanner"

export interface Props {
  artwork: ArtworkApp_artwork$data
  tracking?: TrackingProp
  referrer: string
  routerPathname: string
  shouldTrackPageView: boolean
  me: ArtworkApp_me$data
  router: Router
  match: Match
}

declare const window: any

interface BelowTheFoldArtworkDetailsProps {
  artists: ArtworkApp_artwork$data["artists"]
  slug: ArtworkApp_artwork$data["slug"]
}

const BelowTheFoldArtworkDetails: React.FC<BelowTheFoldArtworkDetailsProps> = ({
  artists,
  slug,
}) => (
  <>
    <Spacer y={6} />
    <Join separator={<Spacer y={2} />}>
      <ArtworkDetailsQueryRenderer slug={slug} />

      <PricingContextQueryRenderer slug={slug} />

      {!!artists &&
        artists.map(artist => {
          if (!artist) return null

          return <ArtistInfoQueryRenderer key={artist.id} slug={artist.slug} />
        })}

      <ArtworkDetailsPartnerInfoQueryRenderer slug={slug} />
    </Join>
  </>
)

export const ArtworkApp: React.FC<Props> = props => {
  const { artwork, me, referrer, tracking, shouldTrackPageView } = props
  const { match, silentPush } = useRouter()

  const showUnlistedArtworkBanner =
    artwork?.visibilityLevel == "UNLISTED" && artwork?.partner

  const showExpiredOfferBanner = !!match?.location?.query?.expired_offer
  const showUnavailableArtworkBanner = !!match?.location?.query?.unavailable

  const trackPageview = useCallback(() => {
    const { listPrice, availability, is_offerable, is_acquireable } = artwork
    const path = window.location.pathname

    if (typeof window.analytics !== "undefined") {
      const properties: any = {
        acquireable: is_acquireable,
        availability,
        offerable: is_offerable,
        path,
        price_listed: !!listPrice,
        url: getENV("APP_URL") + path,
      }

      const clientSideRoutingReferrer =
        window.analytics.__artsyClientSideRoutingReferrer

      if (clientSideRoutingReferrer) {
        properties.referrer = clientSideRoutingReferrer
      } else if (referrer) {
        properties.referrer = referrer
      }

      // This breaks our automatic global pageview tracking middleware
      // patterns due passing some custom properties to the pageview.
      window.analytics.page(properties, { integrations: { Marketo: false } })

      if (typeof window._sift !== "undefined") {
        window._sift.push(["_trackPageview"])
      }
    }
  }, [artwork, referrer])

  const trackProductView = useCallback(() => {
    const { is_acquireable, is_in_auction, internalID } = artwork

    if (is_acquireable || is_in_auction) {
      const trackingData = {
        action_type: DeprecatedSchema.ActionType.ViewedProduct,
        product_id: internalID,
      }
      if (tracking) {
        tracking.trackEvent(trackingData)
      }
    }
  }, [artwork, tracking])

  const trackLotView = useCallback(() => {
    const { is_in_auction, slug, internalID, sale } = artwork

    if (tracking && is_in_auction) {
      const trackingData = {
        action_type: DeprecatedSchema.ActionType.ViewedLot,
        artwork_id: internalID,
        artwork_slug: slug,
        auction_slug: sale?.slug,
        sale_id: sale?.internalID,
      }
      tracking.trackEvent(trackingData)
    }
  }, [artwork, tracking])

  const track = useCallback(() => {
    trackPageview()
    trackProductView()
    trackLotView()
  }, [trackPageview, trackProductView, trackLotView])

  const submittedOrderId = props.match.location.query["order-submitted"]
  /**
   * On mount, trigger a page view and product view
   *
   * We're manually invoking pageView tracking here, instead of within
   * the `trackingMiddleware` file as we need to pass along additional metadata.
   *
   */
  useEffect(() => {
    if (!!submittedOrderId) {
      // TODO: Look into using router push
      // this.props.router.replace(this.props.match.location.pathname)
      silentPush(props.match.location.pathname)
    }
    track()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shouldTrackPageView) {
      track()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldTrackPageView])

  if (match?.location?.query?.creating_order) {
    return (
      <>
        <Spacer y={6} />
        <Flex flexDirection="column" alignItems="center" mb={12} mt={12}>
          <SpinnerContainer>
            <Spinner size="large" color="blue100" />
          </SpinnerContainer>
          <Text variant="md" color="blue100">
            Loading...
          </Text>
        </Flex>
      </>
    )
  }

  return (
    <>
      <UseRecordArtworkView />

      {artwork.sale && (
        <CascadingEndTimesBannerFragmentContainer sale={artwork.sale} />
      )}
      {showUnlistedArtworkBanner && (
        <UnlistedArtworkBannerFragmentContainer partner={artwork.partner} />
      )}

      {showExpiredOfferBanner && (
        <FullBleedBanner variant="brand">
          <Text>
            This offer has expired. Please make a new offer or contact the
            gallery.
          </Text>
        </FullBleedBanner>
      )}

      {showUnavailableArtworkBanner && (
        <FullBleedBanner variant="brand">
          <Text>
            Sorry, this artwork is no longer available. Please create an alert
            or contact orders@artsy.net to find similar artworks.
          </Text>
        </FullBleedBanner>
      )}

      <ArtworkMetaFragmentContainer artwork={artwork} />

      <ArtworkTopContextBarFragmentContainer artwork={artwork} />

      <ArtworkAuctionCreateAlertHeaderFragmentContainer artwork={artwork} />

      <GridColumns>
        <Column
          span={8}
          // Fix for issue in Firefox where contents overflow container.
          // Safe to remove once artwork masonry uses CSS grid.
          width="100%"
        >
          <ArtworkImageBrowserFragmentContainer artwork={artwork} />

          <Media greaterThanOrEqual="sm">
            <BelowTheFoldArtworkDetails
              slug={artwork.slug}
              artists={artwork.artists}
            />
          </Media>
        </Column>
        <Column span={4} pt={[0, 2]}>
          <ArtworkSidebarFragmentContainer artwork={artwork} me={me} />
        </Column>
      </GridColumns>

      <Media lessThan="sm">
        <BelowTheFoldArtworkDetails
          slug={artwork.slug}
          artists={artwork.artists}
        />
      </Media>

      <Spacer y={6} />

      <ArtworkArtistSeriesQueryRenderer slug={artwork.slug} />

      <Spacer y={6} />

      <OtherWorksQueryRenderer slug={artwork.slug} />

      <Spacer y={6} />

      {/* Temporarily suppressed while we investigate performance. See PLATFORM-4980  */}
      {/* <RelatedWorksQueryRenderer slug={artwork.slug} /> */}

      {artwork.artist && (
        <>
          <Spacer y={6} />

          <ArtworkRelatedArtistsQueryRenderer slug={artwork.slug} />
        </>
      )}

      <Spacer y={6} />

      <RecentlyViewed />

      {!!submittedOrderId && (
        <SubmittedOrderModalQueryRenderer orderId={submittedOrderId} />
      )}
    </>
  )
}

const WrappedArtworkApp: React.FC<Props> = props => {
  const {
    artwork: { artists, attributionClass, internalID, mediumType, sale },
  } = props

  const {
    match: {
      location: { pathname, state },
    },
  } = useRouter()

  // Check to see if referrer comes from link interception.
  // @see interceptLinks.ts
  const referrer = state && state.previousHref
  const { isComplete } = useRouteComplete()

  const websocketEnabled = !!sale?.extendedBiddingIntervalMinutes

  const initialAlertCriteria = {
    attributionClass: compact([attributionClass?.internalID]),
    artistIDs: compact(artists).map(artist => artist.internalID),
    additionalGeneIDs: compact([mediumType?.filterGene?.slug as string]),
  }

  return (
    <Analytics contextPageOwnerId={internalID}>
      <WebsocketContextProvider
        channelInfo={{
          channel: "SalesChannel",
          sale_id: sale?.internalID,
        }}
        enabled={websocketEnabled}
      >
        <AlertProvider initialCriteria={initialAlertCriteria}>
          <ArtworkApp
            {...props}
            routerPathname={pathname}
            referrer={referrer}
            shouldTrackPageView={isComplete}
          />
        </AlertProvider>
      </WebsocketContextProvider>
    </Analytics>
  )
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

export const ArtworkAppFragmentContainer = createFragmentContainer(
  withSystemContext(WrappedArtworkApp),
  {
    artwork: graphql`
      fragment ArtworkApp_artwork on Artwork {
        attributionClass {
          internalID
        }
        slug
        internalID
        is_acquireable: isAcquireable
        is_offerable: isOfferable
        availability
        mediumType {
          filterGene {
            slug
          }
        }
        visibilityLevel
        # FIXME: The props in the component need to update to reflect
        # the new structure for price.
        listPrice {
          ... on PriceRange {
            display
          }
          ... on Money {
            display
          }
        }
        partner {
          ...UnlistedArtworkBanner_partner
        }
        is_in_auction: isInAuction
        sale {
          ...CascadingEndTimesBanner_sale
          internalID
          slug
          extendedBiddingIntervalMinutes
        }
        artists {
          id
          internalID
          slug
          ...ArtistInfo_artist
        }
        artist {
          ...ArtistInfo_artist
        }
        ...ArtworkRelatedArtists_artwork
        ...ArtworkMeta_artwork
        ...ArtworkTopContextBar_artwork
        ...ArtworkImageBrowser_artwork
        ...ArtworkSidebar_artwork
        ...ArtworkAuctionCreateAlertHeader_artwork
      }
    `,
    me: graphql`
      fragment ArtworkApp_me on Me {
        ...ArtworkSidebar_me
      }
    `,
  }
)
