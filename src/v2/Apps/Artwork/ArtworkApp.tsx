import { Column, GridColumns, Join, Spacer } from "@artsy/palette"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { ArtworkApp_artwork } from "v2/__generated__/ArtworkApp_artwork.graphql"
import { ArtworkApp_me } from "v2/__generated__/ArtworkApp_me.graphql"
import { ArtistInfoFragmentContainer } from "./Components/ArtistInfo"
import { ArtworkBannerFragmentContainer } from "./Components/ArtworkBanner"
import { ArtworkDetailsFragmentContainer } from "./Components/ArtworkDetails"
import { ArtworkImageBrowserFragmentContainer } from "./Components/ArtworkImageBrowser"
import { ArtworkMetaFragmentContainer } from "./Components/ArtworkMeta"
import { ArtworkRelatedArtistsPaginationContainer } from "./Components/ArtworkRelatedArtists"
import { ArtworkSidebarFragmentContainer } from "./Components/ArtworkSidebar"
import { OtherWorksFragmentContainer } from "./Components/OtherWorks"
import { ArtworkArtistSeriesFragmentContainer } from "./Components/ArtworkArtistSeries"
import { PricingContextFragmentContainer } from "./Components/PricingContext"
import { withSystemContext } from "v2/System"
import * as Schema from "v2/System/Analytics/Schema"
import { RecentlyViewed } from "v2/Components/RecentlyViewed"
import { RouterContext } from "found"
import { TrackingProp } from "react-tracking"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/System/Analytics/AnalyticsContext"
import { Mediator } from "lib/mediator"
import { ReCaptchaContainer } from "v2/Utils/ReCaptchaContainer"
import { useRouteComplete } from "v2/Utils/Hooks/useRouteComplete"
import { Media } from "v2/Utils/Responsive"
import { LegacyArtworkDllContainer } from "../../Utils/LegacyArtworkDllContainer"

export interface Props {
  artwork: ArtworkApp_artwork
  tracking?: TrackingProp
  referrer: string
  routerPathname: string
  shouldTrackPageView: boolean
  me: ArtworkApp_me
  mediator: Mediator
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
    this.track()
  }

  componentDidUpdate() {
    if (this.props.shouldTrackPageView) {
      this.track()
    }
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
        url: sd.APP_URL + path,
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
        // @ts-expect-error STRICT_NULL_CHECK
        auction_slug: sale.slug,
        // @ts-expect-error STRICT_NULL_CHECK
        sale_id: sale.internalID,
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
          <ArtworkDetailsFragmentContainer artwork={artwork} />

          <PricingContextFragmentContainer artwork={artwork} />

          {artwork.artists &&
            artwork.artists.map(artist => {
              if (!artist) return null

              return (
                <ArtistInfoFragmentContainer key={artist.id} artist={artist} />
              )
            })}
        </Join>
      </>
    )

    return (
      <>
        <LegacyArtworkDllContainer />

        {/**
         * FIXME: remove once we refactor out legacy backbone code.
         * Add place to attach legacy flash message, used in legacy inquiry flow
         */}
        <div id="main-layout-flash" />

        <ReCaptchaContainer />

        <>
          <ArtworkMetaFragmentContainer artwork={artwork} />

          <ArtworkBannerFragmentContainer artwork={artwork} />

          <GridColumns>
            <Column span={8}>
              <ArtworkImageBrowserFragmentContainer artwork={artwork} />

              <Media greaterThanOrEqual="sm">
                {BelowTheFoldArtworkDetails}
              </Media>
            </Column>

            <Column span={4} pt={[0, 2]}>
              <ArtworkSidebarFragmentContainer artwork={artwork} me={me} />
            </Column>
          </GridColumns>

          <Media lessThan="sm">{BelowTheFoldArtworkDetails}</Media>

          <Spacer mt={6} />

          <ArtworkArtistSeriesFragmentContainer artwork={artwork} />

          <Spacer mt={6} />

          <OtherWorksFragmentContainer artwork={artwork} />

          {artwork.artist && (
            <>
              <Spacer mt={6} />

              <ArtworkRelatedArtistsPaginationContainer artwork={artwork} />
            </>
          )}

          <Spacer mt={6} />

          <RecentlyViewed />
        </>
      </>
    )
  }
}

const TrackingWrappedArtworkApp: React.FC<Props> = props => {
  const {
    artwork: { internalID },
  } = props
  const {
    match: {
      location: { pathname, state },
    },
  } = useContext(RouterContext)
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()

  // Check to see if referrer comes from link interception.
  // @see interceptLinks.ts
  const referrer = state && state.previousHref
  const { isComplete } = useRouteComplete()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <ArtworkApp
        {...props}
        routerPathname={pathname}
        referrer={referrer}
        shouldTrackPageView={isComplete}
      />
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
          internalID
          slug
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
        ...ArtworkBanner_artwork
        ...ArtworkSidebar_artwork
        ...ArtworkDetails_artwork
        ...ArtworkImageBrowser_artwork
        ...OtherWorks_artwork
        ...ArtworkArtistSeries_artwork
        ...PricingContext_artwork
      }
    `,
    me: graphql`
      fragment ArtworkApp_me on Me {
        ...ArtworkSidebar_me
      }
    `,
  }
)
