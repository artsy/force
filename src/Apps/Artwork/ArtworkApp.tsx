import { Column, GridColumns, Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { getENV } from "Utils/getENV"
import { ArtworkApp_artwork } from "__generated__/ArtworkApp_artwork.graphql"
import { ArtworkApp_me } from "__generated__/ArtworkApp_me.graphql"
import { ArtistInfoQueryRenderer } from "./Components/ArtistInfo"
import { ArtworkTopContextBarFragmentContainer } from "./Components/ArtworkTopContextBar/ArtworkTopContextBar"
import { ArtworkDetailsQueryRenderer } from "./Components/ArtworkDetails"
import { ArtworkImageBrowserFragmentContainer } from "./Components/ArtworkImageBrowser"
import { ArtworkMetaFragmentContainer } from "./Components/ArtworkMeta"
import { ArtworkRelatedArtistsQueryRenderer } from "./Components/ArtworkRelatedArtists"
import { ArtworkSidebarFragmentContainer } from "./Components/ArtworkSidebar"
import { OtherWorksQueryRenderer } from "./Components/OtherWorks"
import { ArtworkArtistSeriesQueryRenderer } from "./Components/ArtworkArtistSeries"
import { PricingContextQueryRenderer } from "./Components/PricingContext"
import { SubmittedOrderModalFragmentContainer } from "./Components/SubmittedOrderModal"
import { withSystemContext } from "System"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { RecentlyViewed } from "Components/RecentlyViewed"
import { useRouter } from "System/Router/useRouter"
import { TrackingProp } from "react-tracking"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "System/Analytics/AnalyticsContext"
import { useRouteComplete } from "Utils/Hooks/useRouteComplete"
import { Media } from "Utils/Responsive"
import { UseRecordArtworkView } from "./useRecordArtworkView"
import { Router, Match } from "found"
import { WebsocketContextProvider } from "System/WebsocketContext"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"
import { useCallback, useEffect } from "react"
import { useFeatureFlag } from "System/useFeatureFlag"
import { ArtworkSidebar2 } from "./Components/ArtworkSidebar2/ArtworkSidebar2"

export interface Props {
  artwork: ArtworkApp_artwork
  tracking?: TrackingProp
  referrer: string
  routerPathname: string
  shouldTrackPageView: boolean
  me: ArtworkApp_me
  router: Router
  match: Match
}

declare const window: any

interface BelowTheFoldArtworkDetailsProps {
  artists: ArtworkApp_artwork["artists"]
  slug: ArtworkApp_artwork["slug"]
}

const BelowTheFoldArtworkDetails: React.FC<BelowTheFoldArtworkDetailsProps> = ({
  artists,
  slug,
}) => (
  <>
    <Spacer mt={6} />
    <Join separator={<Spacer mt={2} />}>
      <ArtworkDetailsQueryRenderer slug={slug} />

      <PricingContextQueryRenderer slug={slug} />

      {!!artists &&
        artists.map(artist => {
          if (!artist) return null

          return <ArtistInfoQueryRenderer key={artist.id} slug={artist.slug} />
        })}
    </Join>
  </>
)

export const ArtworkApp: React.FC<Props> = props => {
  const isNewArtworkSidebarEnabled = useFeatureFlag("fx-force-artwork-sidebar")
  const { artwork, me, referrer, tracking, shouldTrackPageView } = props

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

  const shouldRenderSubmittedOrderModal = !!props.match.location.query[
    "order-submitted"
  ]

  /**
   * On mount, trigger a page view and product view
   *
   * We're manually invoking pageView tracking here, instead of within
   * the `trackingMiddleware` file as we need to pass along additional metadata.
   *
   */
  useEffect(() => {
    if (shouldRenderSubmittedOrderModal) {
      // TODO: Look into using router push
      // this.props.router.replace(this.props.match.location.pathname)
      window.history.pushState({}, null, props.match.location.pathname)
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

  return (
    <>
      <UseRecordArtworkView />

      {artwork.sale && (
        <CascadingEndTimesBannerFragmentContainer sale={artwork.sale} />
      )}

      <ArtworkMetaFragmentContainer artwork={artwork} />

      <ArtworkTopContextBarFragmentContainer artwork={artwork} />

      <GridColumns>
        <Column span={8}>
          <ArtworkImageBrowserFragmentContainer artwork={artwork} />

          <Media greaterThanOrEqual="sm">
            <BelowTheFoldArtworkDetails
              slug={artwork.slug}
              artists={artwork.artists}
            />
          </Media>
        </Column>

        <Column span={4} pt={[0, 2]}>
          {isNewArtworkSidebarEnabled ? (
            <ArtworkSidebar2 />
          ) : (
            <ArtworkSidebarFragmentContainer artwork={artwork} me={me} />
          )}
        </Column>
      </GridColumns>

      <Media lessThan="sm">
        <BelowTheFoldArtworkDetails
          slug={artwork.slug}
          artists={artwork.artists}
        />
      </Media>

      <Spacer mt={6} />

      <ArtworkArtistSeriesQueryRenderer slug={artwork.slug} />

      <Spacer mt={6} />

      <OtherWorksQueryRenderer slug={artwork.slug} />

      {artwork.artist && (
        <>
          <Spacer mt={6} />

          <ArtworkRelatedArtistsQueryRenderer slug={artwork.slug} />
        </>
      )}

      <Spacer mt={6} />

      <RecentlyViewed />

      {shouldRenderSubmittedOrderModal && (
        <SubmittedOrderModalFragmentContainer slug={artwork.slug} me={me} />
      )}
    </>
  )
}

const TrackingWrappedArtworkApp: React.FC<Props> = props => {
  const {
    artwork: { internalID, sale },
  } = props

  const {
    match: {
      location: { pathname, state },
    },
  } = useRouter()
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()
  // Check to see if referrer comes from link interception.
  // @see interceptLinks.ts
  const referrer = state && state.previousHref
  const { isComplete } = useRouteComplete()

  const websocketEnabled = !!sale?.extendedBiddingIntervalMinutes

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <WebsocketContextProvider
        channelInfo={{
          channel: "SalesChannel",
          sale_id: sale?.internalID,
        }}
        enabled={websocketEnabled}
      >
        <ArtworkApp
          {...props}
          routerPathname={pathname}
          referrer={referrer}
          shouldTrackPageView={isComplete}
        />
      </WebsocketContextProvider>
    </AnalyticsContext.Provider>
  )
}

export const ArtworkAppFragmentContainer = createFragmentContainer(
  withSystemContext(TrackingWrappedArtworkApp),
  {
    artwork: graphql`
      fragment ArtworkApp_artwork on Artwork {
        slug
        internalID
        is_acquireable: isAcquireable
        is_offerable: isOfferable
        availability
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
        is_in_auction: isInAuction
        sale {
          ...CascadingEndTimesBanner_sale
          internalID
          slug
          extendedBiddingIntervalMinutes
        }
        artists {
          id
          slug
          ...ArtistInfo_artist
        }
        artist {
          ...ArtistInfo_artist
        }
        ...ArtworkRelatedArtists_artwork
        ...ArtworkMeta_artwork
        ...ArtworkTopContextBar_artwork
        ...ArtworkSidebar_artwork
        ...ArtworkImageBrowser_artwork
      }
    `,
    me: graphql`
      fragment ArtworkApp_me on Me {
        ...ArtworkSidebar_me
        ...SubmittedOrderModal_me
      }
    `,
  }
)
