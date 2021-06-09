import { Box, BoxProps, Spacer } from "@artsy/palette"
import { Match } from "found"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { ArtistApp_artist } from "v2/__generated__/ArtistApp_artist.graphql"
import { AnalyticsContext, useAnalyticsContext } from "v2/Artsy"
import { BackLinkFragmentContainer } from "./Components/BackLink"
import { ArtistHeaderFragmentContainer } from "./Components/ArtistHeader/ArtistHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta"

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
  const PageWrapper = getPageWrapper(artist)

  // A stand-alone page under the /artist route path
  if (route.displayFullPage) {
    return <PageWrapper>{children}</PageWrapper>
  }

  // Sub-page with a back button
  if (route.hideNavigationTabs) {
    return (
      <PageWrapper>
        <BackLinkFragmentContainer artist={artist} />

        <Box mt={2}>{children}</Box>
      </PageWrapper>
    )
  }

  const showArtworksTab = artist?.statuses?.artworks
  const showAuctionLotsTab = artist?.statuses?.auctionLots

  // Default page
  return (
    <PageWrapper>
      <ArtistHeaderFragmentContainer artist={artist} />

      <Spacer my={[4, 12]} id="scrollTo--artistContentArea" />

      <RouteTabs mb={2} fill data-test="navigationTabs">
        <RouteTab exact to={`/artist/${artist.slug}`}>
          Overview
        </RouteTab>

        {showArtworksTab && (
          <RouteTab to={`/artist/${artist.slug}/works-for-sale`}>
            {artist?.counts?.forSaleArtworks! > 0
              ? `Works for sale (${artist?.counts?.forSaleArtworks?.toLocaleString()})`
              : "Artworks"}
          </RouteTab>
        )}

        {showAuctionLotsTab && (
          <RouteTab to={`/artist/${artist.slug}/auction-results`}>
            Auction results
          </RouteTab>
        )}
      </RouteTabs>

      <Box pt={4}>{children}</Box>
    </PageWrapper>
  )
}

export const ArtistAppFragmentContainer = createFragmentContainer(ArtistApp, {
  artist: graphql`
    fragment ArtistApp_artist on Artist {
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

const getPageWrapper = artist => {
  const PageWrapper: React.FC<BoxProps> = ({ children, ...rest }) => {
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

  return PageWrapper
}
