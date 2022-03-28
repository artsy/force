import { Box, BoxProps, Spacer } from "@artsy/palette"
import { Match } from "found"
import { createFragmentContainer, graphql } from "react-relay"
import { findCurrentRoute } from "v2/System/Router/Utils/findCurrentRoute"
import { ArtistApp_artist } from "v2/__generated__/ArtistApp_artist.graphql"
import {
  AnalyticsContextProvider,
  useAnalyticsContext,
  useSystemContext,
} from "v2/System"
import { BackLinkFragmentContainer } from "./Components/BackLink"
import { ArtistHeaderFragmentContainer } from "./Components/ArtistHeader/ArtistHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta"
import { hasOverviewContent } from "./Routes/Overview/Utils/hasOverviewContent"

/**
 * For logged-out users, the sign-up modal is triggered via a global listener.
 * @see https://github.com/artsy/force/blob/136e7087233b5e482fa69fd00d4f1050e492c17c/src/v2/client.tsx#L22-L25
 * @see https://github.com/artsy/force/blob/136e7087233b5e482fa69fd00d4f1050e492c17c/src/middleware.ts#L150
 */

interface ArtistAppProps {
  artist: ArtistApp_artist
  match: Match
}

const ArtistApp: React.FC<ArtistAppProps> = ({ artist, children, match }) => {
  const route = findCurrentRoute(match)!
  const { isEigen } = useSystemContext()

  // A stand-alone page under the /artist route path
  if (route.displayFullPage) {
    return <PageWrapper artist={artist}>{children}</PageWrapper>
  }

  // Sub-page with a back button
  if (route.hideNavigationTabs) {
    return (
      <PageWrapper artist={artist}>
        {!isEigen && <BackLinkFragmentContainer artist={artist} />}
        <Box mt={2}>{children}</Box>
      </PageWrapper>
    )
  }

  const showOverviewTab = hasOverviewContent(artist)
  const showArtworksTab = artist?.statuses?.artworks
  const showAuctionResultsTab = artist?.statuses?.auctionLots

  // Default page
  return (
    <PageWrapper artist={artist}>
      <ArtistHeaderFragmentContainer artist={artist} />

      <Spacer my={[4, 12]} id="scrollTo--artistContentArea" />

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
    <AnalyticsContextProvider
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
    </AnalyticsContextProvider>
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
