import { Box, Spacer } from "@artsy/palette"
import { Match } from "found"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { Artist2App_artist } from "v2/__generated__/Artist2App_artist.graphql"
import { AnalyticsContext, useAnalyticsContext } from "v2/Artsy"
import { BackLinkFragmentContainer } from "./Components/BackLink"
import { Artist2HeaderFragmentContainer } from "./Components/Artist2Header"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { ArtistMetaFragmentContainer } from "../Artist/Components/ArtistMeta"

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
        {children}
      </PageWrapper>
    )
  }

  // Default page
  return (
    <PageWrapper>
      <Artist2HeaderFragmentContainer artist={artist} />

      <Spacer my={[4, 12]} />

      <RouteTabs mb={2} fill>
        <RouteTab exact to={`/artist/${artist.slug}`}>
          Overview
        </RouteTab>
        <RouteTab to={`/artist/${artist.slug}/works-for-sale`}>
          Works for Sale
        </RouteTab>
        <RouteTab to={`/artist/${artist.slug}/auction-results`}>
          Auction Results
        </RouteTab>
      </RouteTabs>

      <Box>{children}</Box>
    </PageWrapper>
  )
}

export const Artist2AppFragmentContainer = createFragmentContainer(Artist2App, {
  artist: graphql`
    fragment Artist2App_artist on Artist {
      ...ArtistMeta_artist
      ...Artist2Header_artist
      ...BackLink_artist

      internalID
      name
      slug
    }
  `,
})

const getPageWrapper = artist => {
  return ({ children }) => {
    const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

    return (
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: artist.internalID,
          contextPageOwnerSlug,
          contextPageOwnerType,
        }}
      >
        <>
          <ArtistMetaFragmentContainer artist={artist} />
          {children}
        </>
      </AnalyticsContext.Provider>
    )
  }
}
