import { Box, Col, Row, Separator, Spacer } from "@artsy/palette"
import React, { useContext } from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { ArtworkApp_artwork } from "v2/__generated__/ArtworkApp_artwork.graphql"
import { ArtworkApp_me } from "v2/__generated__/ArtworkApp_me.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

import { ArtistInfoFragmentContainer as ArtistInfo } from "./Components/ArtistInfo"
import { ArtworkBannerFragmentContainer as ArtworkBanner } from "./Components/ArtworkBanner"
import { ArtworkDetailsFragmentContainer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkImageBrowserFragmentContainer as ArtworkImageBrowser } from "./Components/ArtworkImageBrowser"
import { ArtworkMetaFragmentContainer as ArtworkMeta } from "./Components/ArtworkMeta"
import { ArtworkRelatedArtistsPaginationContainer as RelatedArtists } from "./Components/ArtworkRelatedArtists"
import { ArtworkSidebarFragmentContainer as ArtworkSidebar } from "./Components/ArtworkSidebar"
import { OtherWorksFragmentContainer as OtherWorks } from "./Components/OtherWorks"
import { PricingContextFragmentContainer as PricingContext } from "./Components/PricingContext"

import { SystemContextConsumer } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
// import { trackExperimentViewed } from "v2/Artsy/Analytics/trackExperimentViewed"
import { useRouteTracking } from "v2/Artsy/Analytics/useRouteTracking"
import { Footer } from "v2/Components/Footer"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "v2/Components/RecentlyViewed"
import { RouterContext } from "found"
import { TrackingProp } from "react-tracking"
import { Media } from "v2/Utils/Responsive"

export interface Props {
  artwork: ArtworkApp_artwork
  tracking?: TrackingProp
  referrer: string
  routerPathname: string
  shouldTrackPageView: boolean
  me: ArtworkApp_me
}

declare const window: any
@track()
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
        path,
        acquireable: is_acquireable,
        offerable: is_offerable,
        availability,
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
        sale_id: sale.internalID,
        auction_slug: sale.slug,
      }
      tracking.trackEvent(trackingData)
    }
  }

  enableIntercomForBuyers(mediator) {
    const {
      artwork: { is_offerable, is_acquireable },
    } = this.props
    mediator &&
      mediator.trigger &&
      mediator.trigger("enableIntercomForBuyers", {
        is_offerable,
        is_acquireable,
      })
  }

  renderArtists() {
    const artists = this.props.artwork?.artists

    if (!artists?.length) {
      return null
    }

    return (
      <>
        {artists.map((artist, index) => {
          const addSpacer = artists.length > 1 && index < artists.length - 1
          return (
            <React.Fragment key={index}>
              <Row key={artist.id}>
                <Col>
                  <ArtistInfo artist={artist} />
                </Col>
              </Row>
              {addSpacer && <Spacer mb={2} />}
            </React.Fragment>
          )
        })}
      </>
    )
  }

  render() {
    const { artwork, me } = this.props
    return (
      <AppContainer>
        <HorizontalPadding>
          {/* NOTE: react-head automatically moves these tags to the <head> element */}
          <ArtworkMeta artwork={artwork} />

          <Row>
            <Col sm={8}>
              <ArtworkBanner artwork={artwork} />
              <Spacer mb={2} />
            </Col>
          </Row>

          {/* Mobile */}
          <Media at="xs">
            <Row>
              <Col>
                <ArtworkImageBrowser artwork={artwork} />
                <ArtworkSidebar artwork={artwork} me={me} />
                <ArtworkDetails artwork={artwork} />
                <PricingContext artwork={artwork} />
                {this.renderArtists()}
              </Col>
            </Row>
          </Media>

          {/* Desktop */}
          <Media greaterThan="xs">
            <Row>
              <Col sm={8}>
                <Box pr={4}>
                  <ArtworkImageBrowser artwork={artwork} />
                  <ArtworkDetails artwork={artwork} />
                  <PricingContext artwork={artwork} />
                  {this.renderArtists()}
                </Box>
              </Col>
              <Col sm={4}>
                <ArtworkSidebar artwork={artwork} me={me} />
              </Col>
            </Row>
          </Media>

          <Row>
            <Col>
              <Box mt={3}>
                <OtherWorks artwork={artwork} />
              </Box>
            </Col>
          </Row>

          {artwork.artist && (
            <Row>
              <Col>
                <RelatedArtists artwork={artwork} />
              </Col>
            </Row>
          )}

          {typeof window !== "undefined" && (
            <LazyLoadComponent threshold={1000}>
              <Row>
                <Col>
                  <RecentlyViewed />
                </Col>
              </Row>
            </LazyLoadComponent>
          )}

          <Row>
            <Col>
              <Separator mt={6} mb={3} />
              <Footer />
            </Col>
          </Row>

          <div
            id="lightbox-container"
            style={{
              position: "absolute",
              top: 0,
              zIndex: 1100, // over top nav
            }}
          />
          <SystemContextConsumer>
            {({ mediator }) => <>{this.enableIntercomForBuyers(mediator)}</>}
          </SystemContextConsumer>
        </HorizontalPadding>
      </AppContainer>
    )
  }
}

export const ArtworkAppFragmentContainer = createFragmentContainer(
  (props: Props) => {
    const {
      match: {
        location: { pathname, state },
      },
    } = useContext(RouterContext)

    // Check to see if referrer comes from link interception.
    // @see interceptLinks.ts
    const referrer = state && state.previousHref
    const shouldTrackPageView = useRouteTracking()

    return (
      <ArtworkApp
        {...props}
        routerPathname={pathname}
        referrer={referrer}
        shouldTrackPageView={shouldTrackPageView}
      />
    )
  },
  {
    artwork: graphql`
      fragment ArtworkApp_artwork on Artwork
        @argumentDefinitions(
          shouldFetchArtistSeriesData: { type: "Boolean!" }
        ) {
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
          @arguments(shouldFetchArtistSeriesData: $shouldFetchArtistSeriesData)
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

// Top-level route needs to be exported for bundle splitting in the router
export default ArtworkAppFragmentContainer
