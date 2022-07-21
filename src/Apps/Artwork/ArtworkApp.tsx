import { Column, GridColumns, Join, Spacer } from "@artsy/palette"
import * as React from "react"
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
import * as Schema from "System/Analytics/Schema"
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

export class ArtworkApp extends React.Component<Props> {
  /**
   * On mount, trigger a page view and product view
   *
   * FIXME: We're manually invoking pageView tracking here, instead of within
   * the `trackingMiddleware` file as we need to pass along additional metadata.
   * Waiting on analytics team to decide if there's a better way to capture this
   * data that remains consistent with the rest of the app.
   */
  componentDidMount() {
    if (this.shouldRenderSubmittedOrderModal()) {
      // TODO: Look into using router push
      // this.props.router.replace(this.props.match.location.pathname)
      window.history.pushState({}, null, this.props.match.location.pathname)
    }
    this.track()
  }

  componentDidUpdate() {
    if (this.props.shouldTrackPageView) {
      this.track()
    }
  }

  shouldRenderSubmittedOrderModal() {
    return !!this.props.match.location.query["order-submitted"]
  }

  track() {
    this.trackPageview()
    this.trackProductView()
    this.trackLotView()
  }

  trackPageview() {
    const {
      artwork: { listPrice, availability, is_offerable, is_acquireable },
      referrer,
    } = this.props

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

      // FIXME: This breaks our automatic global pageview tracking middleware
      // patterns. Can these props be tracked on mount using our typical @track()
      // or trackEvent() patterns as used in other apps?
      // See trackingMiddleware.ts
      window.analytics.page(properties, { integrations: { Marketo: false } })

      if (typeof window._sift !== "undefined") {
        window._sift.push(["_trackPageview"])
      }
    }
  }

  trackProductView() {
    const {
      tracking,
      artwork: { is_acquireable, is_in_auction, internalID },
    } = this.props

    if (is_acquireable || is_in_auction) {
      const trackingData = {
        action_type: Schema.ActionType.ViewedProduct,
        product_id: internalID,
      }
      if (tracking) {
        tracking.trackEvent(trackingData)
      }
    }
  }

  trackLotView() {
    const {
      tracking,
      artwork: { is_in_auction, slug, internalID, sale },
    } = this.props

    if (tracking && is_in_auction) {
      const trackingData = {
        action_type: Schema.ActionType.ViewedLot,
        artwork_id: internalID,
        artwork_slug: slug,
        auction_slug: sale?.slug,
        sale_id: sale?.internalID,
      }
      tracking.trackEvent(trackingData)
    }
  }

  render() {
    const { artwork, me } = this.props

    const BelowTheFoldArtworkDetails = (
      <>
        <Spacer mt={6} />
        <Join separator={<Spacer mt={2} />}>
          <ArtworkDetailsQueryRenderer slug={artwork.slug} />

          <PricingContextQueryRenderer slug={artwork.slug} />

          {artwork.artists &&
            artwork.artists.map(artist => {
              if (!artist) return null

              return (
                <ArtistInfoQueryRenderer key={artist.id} slug={artist.slug} />
              )
            })}
        </Join>
      </>
    )

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

            <Media greaterThanOrEqual="sm">{BelowTheFoldArtworkDetails}</Media>
          </Column>

          <Column span={4} pt={[0, 2]}>
            <ArtworkSidebarFragmentContainer artwork={artwork} me={me} />
          </Column>
        </GridColumns>

        <Media lessThan="sm">{BelowTheFoldArtworkDetails}</Media>

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

        {this.shouldRenderSubmittedOrderModal() && (
          <SubmittedOrderModalFragmentContainer slug={artwork.slug} me={me} />
        )}
      </>
    )
  }
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
