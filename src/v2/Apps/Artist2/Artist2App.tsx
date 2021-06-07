import { Box, BoxProps, Spacer } from "@artsy/palette"
import { Match } from "found"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { Artist2App_artist } from "v2/__generated__/Artist2App_artist.graphql"
import { AnalyticsContext, useAnalyticsContext } from "v2/Artsy"
import { BackLinkFragmentContainer } from "./Components/BackLink"
import { Artist2HeaderFragmentContainer } from "./Components/Artist2Header"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { Artist2MetaFragmentContainer } from "./Components/Artist2Meta"

/**
 * For logged-out users, the sign-up modal is triggered via a global listener.
 * @see https://github.com/artsy/force/blob/136e7087233b5e482fa69fd00d4f1050e492c17c/src/v2/client.tsx#L22-L25
 * @see https://github.com/artsy/force/blob/136e7087233b5e482fa69fd00d4f1050e492c17c/src/middleware.ts#L150
 */

interface Artist2AppProps {
  artist: Artist2App_artist
  match: Match
}

const Artist2App: React.FC<Artist2AppProps> = ({ artist, children, match }) => {
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
      <Artist2HeaderFragmentContainer artist={artist} />

      <Spacer my={[4, 12]} id="scrollTo--artist2ContentArea" />

      <RouteTabs mb={2} fill>
        <RouteTab exact to={`/artist2/${artist.slug}`}>
          Overview
        </RouteTab>

        {showArtworksTab && (
          <RouteTab to={`/artist2/${artist.slug}/works-for-sale`}>
            {artist?.counts?.forSaleArtworks! > 0
              ? `Works for sale (${artist?.counts?.forSaleArtworks?.toLocaleString()})`
              : "Artworks"}
          </RouteTab>
        )}

        {showAuctionLotsTab && (
          <RouteTab to={`/artist2/${artist.slug}/auction-results`}>
            Auction Results
          </RouteTab>
        )}
      </RouteTabs>

      <Box pt={4}>{children}</Box>
    </PageWrapper>
  )
}

export const Artist2AppFragmentContainer = createFragmentContainer(Artist2App, {
  artist: graphql`
    fragment Artist2App_artist on Artist {
      ...Artist2Meta_artist
      ...Artist2Header_artist
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
          <Artist2MetaFragmentContainer artist={artist} />
          {children}
        </Box>
      </AnalyticsContext.Provider>
    )
  }

  return PageWrapper
}
