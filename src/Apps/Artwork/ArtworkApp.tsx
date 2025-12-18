import { ContextModule } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  Spinner,
  Text,
} from "@artsy/palette"
import { ArtworkAuctionCreateAlertHeaderFragmentContainer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertHeader"
import { ArtworkDetailsPartnerInfoQueryRenderer } from "Apps/Artwork/Components/ArtworkDetails/ArtworkDetailsPartnerInfo"
import { ArtworkErrorApp } from "Apps/Artwork/Components/ArtworkErrorApp/ArtworkErrorApp"
import { ArtworkPageBanner } from "Apps/Artwork/Components/ArtworkPageBanner"
import { PrivateArtworkDetails } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkDetails"
import { SelectedEditionSetProvider } from "Apps/Artwork/Components/SelectedEditionSetContext"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { useAuthDialog } from "Components/AuthDialog"
import { RecentlyViewed } from "Components/RecentlyViewed"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { withSystemContext } from "System/Contexts/SystemContext"
import { WebsocketContextProvider } from "System/Contexts/WebsocketContext"
import { useRouter } from "System/Hooks/useRouter"
import { Media } from "Utils/Responsive"
import { getENV } from "Utils/getENV"
import type { ArtworkApp_artwork$data } from "__generated__/ArtworkApp_artwork.graphql"
import type { ArtworkApp_artworkResult$data } from "__generated__/ArtworkApp_artworkResult.graphql"
import type { ArtworkApp_me$data } from "__generated__/ArtworkApp_me.graphql"
import type { Match, RenderProps, Router } from "found"
import { compact } from "lodash"
import type React from "react"
import { useCallback, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { ArtistInfoQueryRenderer } from "./Components/ArtistInfo"
import { ArtworkArtistSeriesQueryRenderer } from "./Components/ArtworkArtistSeries"
import { ArtworkDetailsFragmentContainer } from "./Components/ArtworkDetails"
import { ArtworkImageBrowserFragmentContainer } from "./Components/ArtworkImageBrowser/ArtworkImageBrowser"
import { ArtworkMeta } from "./Components/ArtworkMeta"
import { ArtworkRelatedArtistsQueryRenderer } from "./Components/ArtworkRelatedArtists"
import {
  ArtworkSidebarFragmentContainer,
  ArtworkSidebarQueryRenderer,
} from "./Components/ArtworkSidebar/ArtworkSidebar"
import { ArtworkTopContextBarFragmentContainer } from "./Components/ArtworkTopContextBar/ArtworkTopContextBar"
import { OtherWorksQueryRenderer } from "./Components/OtherWorks"
import { PricingContextQueryRenderer } from "./Components/PricingContext"
import { UseRecordArtworkView } from "./useRecordArtworkView"

export interface Props {
  artwork: ArtworkApp_artwork$data
  me: ArtworkApp_me$data
  tracking?: TrackingProp
  referrer: string
  routerPathname: string
  router: Router
  match: Match
}

declare const window: any

interface BelowTheFoldArtworkDetailsProps {
  artists: ArtworkApp_artwork$data["artists"]
  slug: ArtworkApp_artwork$data["slug"]
  artwork: ArtworkApp_artwork$data
}

const BelowTheFoldArtworkDetails: React.FC<
  React.PropsWithChildren<BelowTheFoldArtworkDetailsProps>
> = ({ artists, slug, artwork }) => {
  return (
    <>
      <Spacer y={6} />

      <Box data-test="belowTheFoldArtworkDetails">
        <Join separator={<Spacer y={2} />}>
          <ArtworkDetailsFragmentContainer artwork={artwork} />

          <PricingContextQueryRenderer slug={slug} />

          {!!artists &&
            artists.map(artist => {
              if (!artist) return null

              return (
                <ArtistInfoQueryRenderer key={artist.id} slug={artist.slug} />
              )
            })}

          <ArtworkDetailsPartnerInfoQueryRenderer slug={slug} />
        </Join>
      </Box>
    </>
  )
}

export const ArtworkApp: React.FC<React.PropsWithChildren<Props>> = props => {
  const { artwork, me, referrer, tracking } = props
  const { match, silentReplace } = useRouter()
  const { showAuthDialog } = useAuthDialog()
  const isMobile = !!getENV("IS_MOBILE")

  // If the user is expecting a partner offer, require login and remove
  // the query param from the URL after login.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const expectingPartnerOffer = !!match?.location?.query?.partner_offer_id
    const isLoggedIn = !!me

    if (expectingPartnerOffer) {
      if (!isLoggedIn) {
        showAuthDialog({
          options: {
            title: "Log in or sign up to view gallery offer",
            imageUrl: artwork.image?.url,
          },
          analytics: {
            // TODO: Placeholder - Determine correct tracking - EMI-1783
            contextModule: ContextModule.artworkSidebar,
          },
        })
        return
      }

      const url = new URL(window.location.href)
      url.searchParams.delete("partner_offer_id")
      silentReplace(url.toString())
    }
  }, [])

  const isPrivateArtwork = artwork?.isUnlisted && artwork?.partner

  const trackPageview = useCallback(() => {
    const {
      listPrice,
      availability,
      isOfferable,
      isAcquireable,
      visibilityLevel,
      saleMessage,
    } = artwork
    const path = window.location.pathname

    if (typeof window.analytics !== "undefined") {
      const properties: any = {
        acquireable: isAcquireable,
        availability,
        offerable: isOfferable,
        path,
        price_listed: !!listPrice,
        visibility_level: visibilityLevel,
        price_display: saleMessage,
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
    const { isAcquireable, isInAuction, internalID } = artwork

    if (isAcquireable || isInAuction) {
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
    const { isInAuction, slug, internalID, sale } = artwork

    if (tracking && isInAuction) {
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

  /**
   * On mount, trigger a page view and product view
   *
   * We're manually invoking pageView tracking here, instead of within
   * the `trackingMiddleware` file as we need to pass along additional metadata.
   *
   */

  useEffect(() => {
    track()
  }, [track])

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
    <SelectedEditionSetProvider>
      <UseRecordArtworkView />
      <ArtworkPageBanner artwork={artwork} me={me} />

      <ArtworkMeta artwork={artwork} />
      <ArtworkTopContextBarFragmentContainer artwork={artwork} />
      <ArtworkAuctionCreateAlertHeaderFragmentContainer artwork={artwork} />

      <Spacer y={2} />

      <GridColumns>
        <Column
          span={8}
          // Fix for issue in Firefox where contents overflow container.
          // Safe to remove once artwork masonry uses CSS grid.
          width="100%"
        >
          <ArtworkImageBrowserFragmentContainer artwork={artwork} />

          {isPrivateArtwork ? (
            <Media greaterThanOrEqual="sm">
              <Spacer y={6} />

              <PrivateArtworkDetails artwork={artwork} />

              <Spacer y={6} />
            </Media>
          ) : (
            <Media greaterThanOrEqual="sm">
              <BelowTheFoldArtworkDetails
                slug={artwork.slug}
                artists={artwork.artists}
                artwork={artwork}
              />
            </Media>
          )}
        </Column>

        <Column span={4}>
          {isMobile ? (
            <ArtworkSidebarQueryRenderer artworkID={artwork.internalID} />
          ) : (
            <ArtworkSidebarFragmentContainer artwork={artwork} me={me} />
          )}
        </Column>
      </GridColumns>
      {isPrivateArtwork && (
        <Media lessThan="sm">
          <Spacer y={6} />

          <PrivateArtworkDetails artwork={artwork} />

          <Spacer y={6} />
        </Media>
      )}
      {!isPrivateArtwork && (
        <>
          <Media lessThan="sm">
            <BelowTheFoldArtworkDetails
              slug={artwork.slug}
              artists={artwork.artists}
              artwork={artwork}
            />
          </Media>

          <Spacer y={6} />

          <ArtworkArtistSeriesQueryRenderer slug={artwork.slug} />

          <Spacer y={6} />

          <OtherWorksQueryRenderer slug={artwork.slug} />

          <Spacer y={6} />

          {/* Temporarily suppressed while we investigate performance. See PLATFORM-4980  */}
          {/* <RelatedWorksQueryRenderer slug={artwork.slug} /> */}

          {artwork.artists && (
            <>
              <Spacer y={6} />

              <ArtworkRelatedArtistsQueryRenderer slug={artwork.slug} />
            </>
          )}

          <Spacer y={6} />

          <RecentlyViewed />
        </>
      )}
    </SelectedEditionSetProvider>
  )
}

const WrappedArtworkApp: React.FC<React.PropsWithChildren<Props>> = props => {
  const {
    artwork: { artists, attributionClass, internalID, mediumType, sale, image },
  } = props

  const {
    match: {
      location: { pathname, state },
    },
  } = useRouter()

  // Check to see if referrer comes from link interception.
  // @see interceptLinks.ts
  const referrer = state && state.previousHref

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
        <AlertProvider
          initialCriteria={initialAlertCriteria}
          currentArtworkID={internalID}
          imageUrl={image?.url}
        >
          <ArtworkApp
            {...props}
            routerPathname={pathname}
            referrer={referrer}
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

const ArtworkAppFragmentContainer = createFragmentContainer(
  withSystemContext(WrappedArtworkApp),
  {
    artwork: graphql`
      fragment ArtworkApp_artwork on Artwork
      @argumentDefinitions(loadSidebar: { type: "Boolean!" }) {
        ...ArtworkMeta_artwork
        ...ArtworkTopContextBar_artwork
        ...ArtworkImageBrowser_artwork
        ...ArtworkSidebar_artwork @include(if: $loadSidebar)
        ...ArtworkAuctionCreateAlertHeader_artwork
        ...PrivateArtworkDetails_artwork
        ...ArtworkPageBanner_artwork
        ...ArtworkDetails_artwork

        attributionClass {
          internalID
        }
        slug
        internalID
        isAcquireable
        isOfferable
        published
        availability
        mediumType {
          filterGene {
            slug
          }
        }
        image {
          url(version: "large")
        }
        visibilityLevel
        isUnlisted
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
          __typename
        }
        isInAuction
        sale {
          internalID
          slug
          extendedBiddingIntervalMinutes
        }
        saleMessage
        artists(shallow: true) {
          id
          internalID
          slug
        }
      }
    `,
  },
)

interface ArtworkResultProps extends RenderProps {
  artworkResult: ArtworkApp_artworkResult$data
  me: ArtworkApp_me$data
}

const ArtworkResult: React.FC<
  React.PropsWithChildren<ArtworkResultProps>
> = props => {
  const { artworkResult, ...rest } = props
  const { __typename } = artworkResult

  if (__typename === "Artwork") {
    return <ArtworkAppFragmentContainer artwork={artworkResult} {...rest} />
  }

  return <ArtworkErrorApp artworkError={artworkResult} />
}

export const ArtworkResultFragmentContainer = createFragmentContainer(
  ArtworkResult,
  {
    artworkResult: graphql`
      fragment ArtworkApp_artworkResult on ArtworkResult
      @argumentDefinitions(loadSidebar: { type: "Boolean!" }) {
        __typename

        ...ArtworkApp_artwork @arguments(loadSidebar: $loadSidebar)
        ...ArtworkErrorApp_artworkError
      }
    `,

    me: graphql`
      fragment ArtworkApp_me on Me
      @argumentDefinitions(
        artworkID: { type: "String!" }
        loadSidebar: { type: "Boolean!" }
      ) {
        ...ArtworkSidebar_me
          @include(if: $loadSidebar)
          @arguments(artworkID: $artworkID)
        ...ArtworkPageBanner_me @arguments(artworkID: $artworkID)
      }
    `,
  },
)
