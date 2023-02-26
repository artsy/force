import { Box, BoxProps, Spacer } from "@artsy/palette"
import { Match } from "found"
import { createFragmentContainer, graphql } from "react-relay"
import { findCurrentRoute } from "System/Router/Utils/findCurrentRoute"
import { ArtistApp_artist$data } from "__generated__/ArtistApp_artist.graphql"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "System/Analytics/AnalyticsContext"
import { BackLinkFragmentContainer } from "./Components/BackLink"
import { ArtistHeaderFragmentContainer } from "./Components/ArtistHeader/ArtistHeader"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"
import { hasOverviewContent } from "./Routes/Overview/Utils/hasOverviewContent"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import { Jump } from "Utils/Hooks/useJump"
import { useSystemContext } from "System/SystemContext"

/**
 * For logged-out users, the sign-up modal is triggered via a global listener.
 * @see https://github.com/artsy/force/blob/136e7087233b5e482fa69fd00d4f1050e492c17c/src/client.tsx#L22-L25
 * @see https://github.com/artsy/force/blob/136e7087233b5e482fa69fd00d4f1050e492c17c/src/middleware.ts#L150
 */

interface ArtistAppProps {
  artist: ArtistApp_artist$data
  match: Match
}

const ArtistApp: React.FC<ArtistAppProps> = ({ artist, children, match }) => {
  const route = findCurrentRoute(match)!
  const artworkId = match.params.artworkId
  const { isEigen } = useSystemContext()

  useScrollToOpenArtistAuthModal()

  // FIXME: Instead of polluting the global route config, utilize two different parent apps
  // Sub-page with a back button
  if (route.hideNavigationTabs) {
    return (
      <>
        {!isEigen && (
          <BackLinkFragmentContainer artist={artist} artworkId={artworkId} />
        )}

        <PageWrapper artist={artist}>{children}</PageWrapper>
      </>
    )
  }

  const showOverviewTab = hasOverviewContent(artist)
  const showArtworksTab = artist?.statuses?.artworks
  const showAuctionResultsTab = artist?.statuses?.auctionLots

  // Default page
  return (
    <PageWrapper artist={artist}>
      <ArtistHeaderFragmentContainer artist={artist} />

      <Spacer y={[4, 12]} />

      <Jump id="artistContentArea" />

      <RouteTabs mb={2} fill data-test="navigationTabs">
        {showOverviewTab && (
          <RouteTab exact to={`/artist/${artist.slug}`}>
            Overview
          </RouteTab>
        )}

        {showArtworksTab && (
          <RouteTab to={`/artist/${artist.slug}/works-for-sale`}>
            {artist?.counts?.forSaleArtworks! > 0
              ? `Works for Sale (${artist?.counts?.forSaleArtworks?.toLocaleString()})`
              : "Artworks"}
          </RouteTab>
        )}

        {showAuctionResultsTab && (
          <RouteTab to={`/artist/${artist.slug}/auction-results`}>
            Auction Results
          </RouteTab>
        )}
      </RouteTabs>

      <Box pt={4}>{children}</Box>
    </PageWrapper>
  )
}

const PageWrapper: React.FC<Omit<ArtistAppProps, "match"> & BoxProps> = ({
  children,
  artist,
  ...rest
}) => {
  const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: artist.internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <Box mt={[2, 4]} {...rest}>
        <ArtistMetaFragmentContainer artist={artist} />
        {children}
      </Box>
    </AnalyticsContext.Provider>
  )
}

export const ArtistAppFragmentContainer = createFragmentContainer(ArtistApp, {
  artist: graphql`
    fragment ArtistApp_artist on Artist {
      ...ArtistApp_sharedMetadata @relay(mask: false)
      ...ArtistMeta_artist
      ...ArtistHeader_artist
      ...BackLink_artist
      counts {
        forSaleArtworks
      }
      internalID
      name
      slug
      statuses {
        artworks
        auctionLots
      }
    }
  `,
})

/**
 * Shared fragment between main artist routes and overview, used to determine
 * if we redirect to works-for sale and hide `Overview` tab.
 */
export const sharedMetaDataQuery = graphql`
  fragment ArtistApp_sharedMetadata on Artist {
    slug
    statuses {
      shows
      cv(minShowCount: 0)
      articles
    }
    counts {
      forSaleArtworks
      auctionResults
    }
    related {
      genes {
        edges {
          node {
            slug
          }
        }
      }
    }
    highlights {
      # Alias due to obscure Graphql validation warning
      artistPartnersConnection: partnersConnection(
        first: 10
        displayOnPartnerProfile: true
        representedBy: true
        partnerCategory: ["blue-chip", "top-established", "top-emerging"]
      ) {
        edges {
          node {
            categories {
              slug
            }
          }
        }
      }
    }
    insights {
      type
    }
    biographyBlurb(format: HTML, partnerBio: false) {
      text
    }
  }
`
